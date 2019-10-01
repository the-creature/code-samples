import React, { FC, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import get from 'lodash.get';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import TextField from '../../../../../shared-components/Fields/TextField/TextField';
import { TopicMessage, TopicSection } from './Topic_Styled';
import { WorkflowEvent } from '../../../../../redux/modules/workflow';

interface TopicProps {
  classificationPaneHeaderLabel: string;
  supportTopicLabel: string;
  name: string;
  placeholder: string;
  step: string;
  value: string;
  requiredValue: string;
  message: string;
  error: string | undefined;
  trigger: (data: WorkflowEvent) => void;
  updateTopic: (topic: string) => void;
}

/**
 * Renders the header section of the case_log view state with topic information.
 * @param topic
 * @param updateTopic
 */
const TopicComponent: FC<TopicProps> = React.memo(
  ({
    classificationPaneHeaderLabel,
    supportTopicLabel,
    name,
    placeholder,
    value,
    requiredValue,
    message,
    error,
    trigger,
    updateTopic,
  }) => {
    const debouncedTrigger = useCallback(debounce(trigger, 500), []);

    return (
      <TopicSection
        id="classification_main_header_section"
        onClick={() =>
          trigger({
            name: 'classification_main_header_section',
            type: 'click',
          })
        }
        aria-label={classificationPaneHeaderLabel}
        role="group"
      >
        <TextField
          aria-label={supportTopicLabel}
          error={error}
          errorPosition="bottom"
          inputSize="large"
          placeholder={placeholder}
          id="classification_topic_textfield"
          value={value}
          requiredValue={requiredValue}
          onChange={event => {
            updateTopic(event.target.value);
            debouncedTrigger({
              name,
              type: 'change',
            });
          }}
        />
        <TopicMessage>{message}</TopicMessage>
      </TopicSection>
    );
  }
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: { classificationPaneHeaderLabel, supportTopicLabel },
        },
        data: {
          topic: {
            field: { name, placeholder, defaultValue, requiredValue },
            message,
          },
        },
      },
    },
    context,
    context: { errors },
  } = workflowData;
  const { trigger, updateTopic } = actions;

  return {
    classificationPaneHeaderLabel,
    supportTopicLabel,
    name,
    placeholder,
    value: get(context, name, defaultValue),
    requiredValue,
    message,
    error: get(errors, name),
    trigger,
    updateTopic,
  };
};

export default connect(
  TopicComponent,
  selector
);
