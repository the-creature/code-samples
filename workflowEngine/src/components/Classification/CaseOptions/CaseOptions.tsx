import React, { FC, useContext } from 'react';
import get from 'lodash.get';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import SelectFieldNested from '../../../shared-components/Fields/SelectFieldNested/SelectFieldNested';
import { WorkflowEvent } from '../../../redux/modules/workflow';

interface CaseOptionsProps {
  name: string;
  label: string;
  options: CaseOptionType[];
  error: string | undefined;
  value: string;
  trigger: (data: WorkflowEvent) => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
}

interface CaseOptionType {
  $?: {
    defaultValue: string;
  };
  children?: {
    value: string | string[];
  };
  label?: string;
  value: string;
}

const CaseOptions: FC<CaseOptionsProps> = React.memo(
  ({ name, label, options, error, value, trigger, updateField }) => (
    <React.Fragment>
      <SelectFieldNested
        id="classification_case_options"
        options={options}
        error={error}
        errorPosition="top"
        value={value}
        onSelect={data => {
          updateField({
            name,
            value: data,
          });
          trigger({
            name,
            type: 'change',
          });
        }}
      />
      <button
        id="classification_save_case"
        onClick={() => trigger({ name: 'save-case', type: 'click' })}
      >
        {label}
      </button>
    </React.Fragment>
  )
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        data: {
          caseOptions: {
            element: {
              $: { name },
              options: { option },
            },
            button,
          },
        },
      },
    },
    context,
    context: { errors },
  } = workflowData;
  const { trigger, updateField } = actions;

  return {
    name,
    label: button.label,
    options: option,
    error: get(errors, name),
    value: get(context, name),
    trigger,
    updateField,
  };
};

export default connect(
  CaseOptions,
  selector
);
