import React, { FC, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import get from 'lodash.get';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import { WorkflowActions } from '../../../../../pages/Workflow';
import {
  TroubleShootSetItemType,
  TroubleShootSetElementType,
  WorkflowDataType,
  WorkflowEvent,
} from '../../../../../redux/modules/workflow';
import TextField from '../../../../../shared-components/Fields/TextField/TextField';
import Line from '../../../../../shared-components/Line/Line';
import Callout from '../../../../../shared-components/Callout/Callout';
import SelectFields from '../SelectFields/SelectFields';
import ConsultButton, { ConsultButtonType } from '../ConsultButton/ConsultButton';
import { Label, Field } from '../../../Classification_Styled';

interface FieldsProps {
  errors: { [index: string]: string };
  fields: TroubleshootElementWithValueType[];
  set: TroubleshootSetType[];
  trigger: (data: WorkflowEvent) => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
}

export interface TroubleshootSetType {
  $: {
    id: string;
  };
  element: TroubleshootElementType | TroubleshootElementType[];
}

interface TroubleshootInputElementType {
  $: {
    type: string;
    name: string;
  };
  label: string;
  field: {
    placeholder: string;
    defaultValue: string;
  };
}

interface TroubleshootCalloutElementType {
  $: {
    type: string;
  };
  content: string;
}

export interface TroubleshootDropdownElementType {
  $: {
    type: string;
    name: string;
    hasNested: string;
  };
  label: string;
  options: {
    option: TroubleshootOption[];
  };
}

interface TroubleshootButtonsElementType {
  $: {
    type: string;
    name: string;
  };
  label: string;
  buttons: {
    button: ConsultButtonType[];
  };
}

export type TroubleshootElementType =
  | TroubleshootInputElementType
  | TroubleshootCalloutElementType
  | TroubleshootDropdownElementType
  | TroubleshootButtonsElementType;

type TroubleshootElementWithValueType = TroubleshootElementType & {
  value?: string;
};

export interface TroubleshootOption {
  $?: {
    correct: string;
    troubleshootId: string;
  };
  value: string;
}

// Renders the dynamic/static fields for the target issue
const FieldsComponent: FC<FieldsProps> = React.memo(
  ({ errors, fields, set, trigger, updateField }) => {
    const debouncedTrigger = useCallback(debounce(trigger, 500), []);

    return (
      <>
        {fields.map((element: TroubleshootElementType, i: number) => {
          if (element.$.type === 'input') {
            return (
              <React.Fragment key={`troubleshoot_fields_${i + 1}`}>
                <Field
                  id={`classification_field_${(element as TroubleshootInputElementType).$.name.toLowerCase()}`}
                >
                  <Label>{(element as TroubleshootInputElementType).label}</Label>
                  <TextField
                    error={get(errors, (element as TroubleshootInputElementType).$.name)}
                    errorPosition="bottom"
                    placeholder={(element as TroubleshootInputElementType).field.placeholder}
                    value={get(element, 'value')}
                    onChange={event => {
                      updateField({
                        name: (element as TroubleshootInputElementType).$.name,
                        value: event.target.value,
                      });
                      debouncedTrigger({
                        name: (element as TroubleshootInputElementType).$.name,
                        type: 'change',
                      });
                    }}
                  />
                </Field>
                <Line aria-hidden="true" />
              </React.Fragment>
            );
          }
          if (element.$.type === 'callout') {
            return (
              <React.Fragment key={`troubleshoot_fields_${i + 1}`}>
                <Callout html={(element as TroubleshootCalloutElementType).content} />
                <Line aria-hidden="true" />
              </React.Fragment>
            );
          }
          if (element.$.type === 'dropdown') {
            return (
              <SelectFields
                key={`troubleshoot_fields_${i + 1}`}
                name={(element as TroubleshootDropdownElementType).$.name}
                set={set}
                hasNested={get(element, '$.hasNested', 'No')}
                label={(element as TroubleshootDropdownElementType).label}
                options={(element as TroubleshootDropdownElementType).options.option}
              />
            );
          }
          if (element.$.type === 'consult_buttons') {
            return (
              <ConsultButton
                key={`troubleshoot_fields_${i + 1}`}
                name={(element as TroubleshootButtonsElementType).$.name}
                label={(element as TroubleshootButtonsElementType).label}
                buttons={(element as TroubleshootButtonsElementType).buttons.button}
              />
            );
          }
        })}
      </>
    );
  }
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        data: {
          troubleShooting: { set },
        },
      },
    },
    context,
    context: { errors, issue },
  } = workflowData as WorkflowDataType;
  const { trigger, updateField } = actions as WorkflowActions;
  const fields = set
    .reduce((results: TroubleShootSetElementType[], item: TroubleShootSetItemType) => {
      const {
        $: { id },
        element,
      } = item;
      if (id === get(issue, '$.troubleshootId')) {
        return element;
      }
      return results;
    }, [])
    .map((item: TroubleShootSetElementType) => ({
      ...item,
      ...(item.$.type === 'input'
        ? {
            value: get(
              context,
              (item as TroubleshootInputElementType).$.name,
              (item as TroubleshootInputElementType).field.defaultValue
            ),
          }
        : {}),
    }));

  return {
    errors,
    fields,
    set,
    trigger,
    updateField,
  };
};

export default connect(
  FieldsComponent,
  selector
);
