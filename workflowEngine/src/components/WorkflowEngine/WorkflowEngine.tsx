import React, { FC, useState } from 'react';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';
import some from 'lodash.some';
import { WorkflowContextConsumer } from '../../shared-components/WorkflowContext/WorkflowContext';
import {
  Condition,
  Consequence,
  WorkflowError,
  EventProps,
  Step,
  Rule,
  TriggerEvent,
  WorkflowContextData,
} from '../../redux/modules/workflow';
import { stepNumber } from '../../config/utils';
import * as plugins from './plugins';

/**
 * Workflow Engine Logic:
 *
 * All components send data and events, the data and events will be saved into redux (context).
 * Workflow Engine will always get new context data including form data and events.
 *
 * 1. The engine will check events queue in context, and compare with the trigger events configured
 *    in steps.step.events section. if find matched trigger event. go to step 2.
 * 2. The engine will check precondition configuration, if found, run validation.
 * 3. If no preconditions configured, or preconditions passed, check all conditions.
 * 4. If all conditions passed, run configured consequences, most of time, it's nextStep.
 */
export interface Plugins {
  [pluginName: string]: (context: WorkflowContextData) => boolean;
}

export interface TriggerEventDetail {
  type: string;
  name: string;
}

export interface LastProcessedEventType {
  name: string;
  type: string;
  triggerTime: string;
}

const WorkflowEngine: FC = () => {
  const [cachedContext, setCachedContext] = useState<WorkflowContextData | null>(null);
  const [lastProcessedEvent, setLastProcessedEvent] = useState<LastProcessedEventType | null>(null);

  return (
    <WorkflowContextConsumer>
      {({ workflowData, actions }) => {
        const { nextStep, resetAllErrors, resetError, setError, updateField, updateView } = actions;
        const { rules, steps, context } = workflowData;
        const { currentStepIndex, errors, events: eventsQueue } = context;
        const workflowRules = get(rules, 'rule', []);

        // **** functions ****

        // function used to check single condition
        const checkCondition = (context: WorkflowContextData, condition: Condition) =>
          new Promise(resolve => {
            if (!condition) resolve(false);
            const {
              $: { field, operator, extra, type, name },
            } = condition;
            const { value } = condition;

            if (!isEmpty(type) && type === 'plugin') {
              if (
                name !== undefined &&
                get(plugins, name, () => {
                  resolve(true);
                }).call(null, context)
              ) {
                resolve(true);
              } else {
                resolve(false);
              }
            }

            const fieldValue:
              | boolean
              | number
              | number[]
              | string
              | string[]
              | object
              | object[]
              | null
              | undefined = get(context, field);

            switch (operator) {
              case 'contain': {
                return value !== undefined && value.includes(fieldValue as string)
                  ? resolve(true)
                  : resolve(false);
              }
              case 'equals': {
                return fieldValue === value || condition.$.value ? resolve(true) : resolve(false);
              }
              case 'not-equals': {
                return !isEmpty(fieldValue) && fieldValue !== value
                  ? resolve(true)
                  : resolve(false);
              }
              case 'required': {
                return !isEmpty(fieldValue) ? resolve(true) : resolve(false);
              }
              case 'requiredIf': {
                const requiredCondition = get(extra, 'requiredIf');

                (async () => {
                  // check requiredIf condition, if not pass, return true
                  const requiredConditionPass = await checkCondition(context, requiredCondition);
                  if (!requiredConditionPass) return resolve(true);
                  return !isEmpty(fieldValue) ? resolve(true) : resolve(false);
                })();
              }
            }
          });

        // run check of single or set of conditions
        const checkConditions = (conds: Condition | Condition[]): Promise<boolean> =>
          new Promise<boolean>(resolve => {
            Promise.all(
              Array.isArray(conds)
                ? conds.map((c: Condition) => checkCondition(context, c))
                : [checkCondition(context, conds)]
            ).then(results => {
              if (results.includes(false)) {
                resolve(false);
              } else {
                resolve(true);
              }
            });
          });

        // check conditions of specified step, simple conditions or switch conditions
        const checkConditionsOfStep = async (checkStep: Step) => {
          const simpleConditions = get(checkStep, 'conditions.condition', []);
          const switchConditions = get(checkStep, 'conditions.switch');

          // validate conditions of previous step
          let validationResult = true;
          if (!isEmpty(simpleConditions)) {
            validationResult = await checkConditions(simpleConditions);
          } else if (!isEmpty(switchConditions)) {
            const checkField = get(switchConditions, '$.name');
            const fieldValue = get(context, checkField);

            // check each case
            let findMatchCase = false;
            for (const item of switchConditions.case) {
              if (fieldValue === item.value) {
                findMatchCase = true;
                // @ts-ignore
                validationResult = await checkConditions(item.condition);
              }
            }

            // check default
            if (switchConditions.default && !findMatchCase) {
              // @ts-ignore
              validationResult = await checkConditions(switchConditions.default.condition);
            }
          }

          return validationResult;
        };

        // function used to run consequences
        const runConsequences = (
          stepIndex: string,
          stepConsequences: Consequence | Consequence[]
        ) => {
          if (isEmpty(stepIndex)) return;

          // get all consequences
          const actions = Array.isArray(stepConsequences) ? stepConsequences : [stepConsequences];
          // @ts-ignore
          actions.forEach(action => {
            switch (action.$.type) {
              case 'nextStep': {
                if (currentStepIndex === parseInt(stepIndex, 10)) {
                  return nextStep(currentStepIndex);
                }
                return;
              }
              case 'updateView': {
                return updateView(action.$.params);
              }
              case 'setFocus': {
                return updateField({
                  name: 'focus',
                  value: action.$.params,
                });
              }
              // add more consequence type ...
            }
          });
        };

        /** * workflow engine ** */

        (async () => {
          // if already complete, return
          if (currentStepIndex === steps.length - 1) {
            return;
          }

          // reset error when field value changed
          if (!isEqual(cachedContext, context)) {
            for (const key in errors as WorkflowError) {
              if (!isEqual(get(cachedContext, key), get(context, key))) {
                resetError(key);
              }
            }
            setCachedContext(context);
          }

          // sort events queue by descending order
          if (eventsQueue !== null && eventsQueue !== undefined) {
            (eventsQueue as EventProps[]).sort((a: EventProps, b: EventProps) => {
              if (a.triggerTime !== undefined && b.triggerTime !== undefined) {
                return a.triggerTime < b.triggerTime ? 1 : b.triggerTime < a.triggerTime ? -1 : 0;
              }
              return 0;
            });
          }

          // 1. check event triggers
          if (eventsQueue && (eventsQueue as EventProps[]).length > 0) {
            // pick the last event from events queue
            const lastEvent = (eventsQueue as EventProps[])[0];

            // which step?
            let step: Step | null = null;
            let stepIndex = 0;

            // compare last event with the events in rules of all steps
            // return the first match step and cache it
            let triggerEventFound = false;
            for (const s of steps) {
              const stepEvents = get(s, 'events.event', []);
              const mappedStepEvents: TriggerEventDetail[] = Array.isArray(stepEvents)
                ? stepEvents.map((item: TriggerEvent) => item.$)
                : [get(stepEvents, '$')];
              if (
                some(mappedStepEvents, {
                  name: lastEvent.name,
                  type: lastEvent.type,
                })
              ) {
                triggerEventFound = true;
                step = s;
                break;
              }
              stepIndex++;
            }

            // if the step already complete and change again, skip
            if (step && stepNumber(step.$.step as string) < (currentStepIndex as number)) return;

            // confirm the lastEvent is not same with last processed event
            if (triggerEventFound && !isEqual(lastProcessedEvent, lastEvent)) {
              const { consequences, preconditions } = step as Step;
              const stepPreConditions = get(preconditions, 'value', []).map(
                (item: { $: { condition: string } }) => item.$.condition
              );
              const stepConsequences = get(consequences, 'consequence', []);

              // update last processed event
              setLastProcessedEvent(lastEvent as LastProcessedEventType);

              // reset all errors
              resetAllErrors();

              // 2. check preconditions of current step
              const preConditonCheckResults = [];
              if (stepPreConditions.length > 0) {
                for (const ruleName of stepPreConditions) {
                  const preCondition = workflowRules.find((rule: Rule) => rule.$.name === ruleName);
                  const result = await checkCondition(context, {
                    $: {
                      field: get(preCondition, '$.field'),
                      operator: get(preCondition, '$.type'),
                      value: null,
                      extra: preCondition,
                    },
                  });
                  preConditonCheckResults.push(result);
                  if (!result) {
                    setError({
                      field: get(preCondition, '$.field'),
                      errorMessage: get(preCondition, 'errorMessage') || '',
                    });
                  }
                }
              }

              // if any failed preconditions found, stop running
              if (preConditonCheckResults.length > 0 && preConditonCheckResults.includes(false)) {
                return;
              }

              // 3. check conditions of previous steps if step.$.backwardConditionCheck is true, default true
              let previousStepConditionPass = true;
              if (stepIndex > 0 && get(step, '$.backwardConditionCheck', 'true') === 'true') {
                const previousSteps = steps.slice(0, stepIndex);
                for (const prevStep of previousSteps) {
                  if (!(await checkConditionsOfStep(prevStep))) {
                    previousStepConditionPass = false;
                    break;
                  }
                }
              }

              // if previous step conditions check does not pass, return
              if (!previousStepConditionPass) return;

              // 4. check all conditions of current step, if all conditions match, run consequences
              if (await checkConditionsOfStep(step as Step)) {
                // 5. run consequences
                runConsequences(get(step, '$.step'), stepConsequences);
              }
            }
          }
        })();

        return <div />;
      }}
    </WorkflowContextConsumer>
  );
};

export default WorkflowEngine;
