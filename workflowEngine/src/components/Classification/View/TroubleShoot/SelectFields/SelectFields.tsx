import React, { useContext } from 'react';
import get from 'lodash.get';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import TextField from '../../../../../shared-components/Fields/TextField/TextField';
import SelectField from '../../../../../shared-components/Fields/SelectField/SelectField';
import Callout from '../../../../../shared-components/Callout/Callout';
import Line from '../../../../../shared-components/Line/Line';
import { WorkflowEvent } from '../../../../../redux/modules/workflow';
import { Label, Field } from '../../../Classification_Styled';
import { TroubleshootElementType, TroubleshootOption, TroubleshootSetType } from '../Fields/Fields';

interface SelectFieldsProps {
  resolutionLabel: string;
  /** Renders a special Select field that can render new fields based on the selected value */
  options: TroubleshootOption[];
  /** The entire list of issue related fields */
  set: TroubleshootSetType[];
  /** Label for the current select field */
  label: string;
  /** If the select field will trigger / render nexted fields, Yes or No */
  hasNested: string;
  error: string | undefined;
  name: string;
  value: string;
  troubleShootSet: TroubshootSetContextType[];
  trigger: (data: WorkflowEvent) => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
}

interface TroubshootSetContextType {
  $: {
    type: string;
    name: string;
  };
  label: string;
  options: {
    option: TroubleshootSetOptionContextType[];
  };
  content?: string;
}

interface TroubleshootSetOptionContextType {
  $?: {
    correct: string;
  };
  value: string;
}

/**
 * A specialized select field component that can render extra fields based
 * on the select field's selected value.
 */
class SelectFieldsComponent extends React.Component<SelectFieldsProps> {
  /**
   * Grabs the target set of fields based on the troubleshootId in the select field's value
   * @param set - the entire list of issue related fields
   * @param troubleshootId - attribute used to target appropriate set of fields
   */
  grabNewSet = (set: TroubleshootSetType[], troubleshootId: string | number) => {
    return set.reduce((results: TroubleshootElementType[], item: TroubleshootSetType) => {
      const {
        $: { id },
        element,
      } = item;
      if (id === troubleshootId) {
        if (Array.isArray(element)) {
          results.push(...element);
        } else {
          results.push(element);
        }
      }
      return results;
    }, []);
  };

  /**
   * Handles the on select event of the original select field and
   * used to render related sets of fields
   * @param data - data passed from the select field component
   */
  onSelect = (data: TroubleshootOption) => {
    const { name, hasNested, set, updateField, trigger } = this.props;

    if (hasNested === 'Yes') {
      if (data.$) {
        const {
          $: { troubleshootId },
        } = data;
        if (troubleshootId) {
          const newSet = this.grabNewSet(set, troubleshootId);
          updateField({
            name: 'troubleShootSet',
            value: newSet,
          });
        } else {
          // Reset set state value
          updateField({
            name: 'troubleShootSet',
            value: [],
          });
        }
      } else {
        // Reset set state value
        updateField({
          name: 'troubleShootSet',
          value: [],
        });
      }
    }

    updateField({
      name,
      value: data.value,
    });

    trigger({
      name,
      type: 'change',
    });
  };

  // Renders the new set based on the this.state.set value
  renderNewSet = () => {
    const { troubleShootSet, updateField, trigger } = this.props;

    if (troubleShootSet.length > 0) {
      return troubleShootSet.map((item: TroubshootSetContextType, i: number) => {
        const {
          $: { type, name },
        } = item;
        if (type === 'dropdown') {
          const {
            label,
            options: { option },
          } = item;
          const value = get(item, 'value');
          const error = get(item, 'error');
          return (
            <React.Fragment key={`troubleshoot_fields_extra_${type}_${i + 1}`}>
              <Field id={`classification_field_${name.toLowerCase()}`}>
                <Label>{label}</Label>
                <SelectField
                  error={error}
                  errorPosition="bottom"
                  onSelect={data => {
                    updateField({
                      name,
                      value: data.value,
                    });

                    trigger({
                      name,
                      type: 'change',
                    });
                  }}
                  options={option}
                  value={value}
                />
              </Field>
              <Line />
            </React.Fragment>
          );
        }
        if (type === 'callout') {
          return (
            <React.Fragment key={`troubleshoot_fields_extra_${type}_${i + 1}`}>
              <Callout html={get(item, 'content', '')} />
              <Line />
            </React.Fragment>
          );
        }
        if (type === 'textarea') {
          return (
            <React.Fragment key={`troubleshoot_fields_extra_${type}_${i + 1}`}>
              <Field id={`classification_field_${name.toLowerCase()}`}>
                <Label>{item.label}</Label>
                <TextField />
              </Field>
              <Line />
            </React.Fragment>
          );
        }
      });
    }
    return null;
  };

  render() {
    const { resolutionLabel, error, hasNested, label, name, value, options } = this.props;
    const ariaProps: { [key: string]: string } = {};
    if (name.toLowerCase() === 'resolution') {
      ariaProps['role'] = 'group';
      ariaProps['aria-label'] = resolutionLabel;
    }

    return (
      <>
        <Field id={`classification_field_${name.toLowerCase()}`} {...ariaProps}>
          <Label>{label}</Label>
          <SelectField
            error={error}
            errorPosition="bottom"
            value={value}
            onSelect={this.onSelect}
            options={options}
          />
        </Field>
        <Line />
        {hasNested === 'Yes' && this.renderNewSet()}
      </>
    );
  }
}

const selector = (ownProps: { name: string }) => {
  const { name } = ownProps;
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: { resolutionLabel },
        },
      },
    },
    context,
    context: { errors },
  } = workflowData;
  const { updateField, trigger } = actions;
  const troubleShootSet = get(context, 'troubleShootSet', []).map(
    (item: TroubshootSetContextType) => {
      const { $ } = item;
      if ($.type === 'dropdown') {
        return {
          ...item,
          error: get(errors, $.name),
          value: get(context, $.name),
        };
      }
      return {
        ...item,
      };
    }
  );

  const value = get(context, name);

  return {
    resolutionLabel,
    error: get(errors, name),
    name,
    value,
    troubleShootSet,
    trigger,
    updateField,
  };
};

export default connect(
  SelectFieldsComponent,
  selector
);
