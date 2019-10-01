import React, { FC, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import get from 'lodash.get';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { WorkflowEvent } from '../../../redux/modules/workflow';
import TextField from '../../../shared-components/Fields/TextField/TextField';
import { AdditionalNotesSection, LayoutRow, TextArea } from './AdditionalNotes_Styled';

const horizontal = require('../../../static/images/horizontal.png');
const vertical = require('../../../static/images/vertical.png');
const popout = require('../../../static/images/popout.png');

interface AdditionalNotesProps {
  dockBottom: string;
  dockRight: string;
  detach: string;
  name: string;
  error: string | undefined;
  value: string;
  placeholder: string;
  trigger: (data: WorkflowEvent) => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
}

const AdditionalNotes: FC<AdditionalNotesProps> = React.memo(
  ({ dockBottom, dockRight, detach, name, error, value, placeholder, trigger, updateField }) => {
    const debouncedTrigger = useCallback(debounce(trigger, 500), []);

    return (
      <AdditionalNotesSection>
        <LayoutRow>
          <button id="horizontal-notes-button" title={dockBottom}>
            <img src={horizontal} aria-hidden="true" />
          </button>
          <button id="vertical-notes-button" title={dockRight}>
            <img src={vertical} aria-hidden="true" />
          </button>
          <button id="popout-nodes-button" title={detach}>
            <img src={popout} aria-hidden="true" />
          </button>
        </LayoutRow>
        <TextArea>
          <TextField
            error={error}
            errorPosition="bottom"
            type="textarea"
            value={value}
            placeholder={placeholder}
            onChange={event => {
              updateField({
                name,
                value: event.target.value,
              });
              debouncedTrigger({
                name,
                type: 'change',
              });
            }}
          />
        </TextArea>
      </AdditionalNotesSection>
    );
  }
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        data: {
          additionalNotes: {
            $: { name },
            labels: { dockBottom, dockRight, detach },
            placeholder,
          },
        },
      },
    },
    context,
    context: { errors },
  } = workflowData;
  const { trigger, updateField } = actions;

  return {
    dockBottom,
    dockRight,
    detach,
    name,
    error: get(errors, name),
    value: get(context, name, ''),
    placeholder,
    trigger,
    updateField,
  };
};

export default connect(
  AdditionalNotes,
  selector
);
