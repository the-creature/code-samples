import React, { useContext } from 'react';
import get from 'lodash.get';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import { WorkflowEvent } from '../../../../../redux/modules/workflow';
import Line from '../../../../../shared-components/Line/Line';
import { Label, Field } from '../../../Classification_Styled';
import { ButtonList, Button } from './ConsultButton_Styled';

interface ConsultButtonProps {
  consultWithAnotherAdvisorLabel: string;
  activeConsultButtonIndex: number;
  /** The label for the Consult Button field */
  label: string;
  /** Buttons that displays No Consult and Consult */
  buttons: ConsultButtonType[];
  name: string;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
  trigger: (data: WorkflowEvent) => void;
}

export interface ConsultButtonType {
  $?: {
    correct: string;
  };
  value: string;
}

class ConsultButton extends React.Component<ConsultButtonProps> {
  /**
   * Handles the onClick event for clicking on a button
   * @param index - index of the clicked button
   */
  onButtonClick = (index: number) => {
    const { name, updateField, trigger } = this.props;

    updateField({
      name,
      value: index,
    });

    trigger({
      name,
      type: 'click',
    });
  };

  /**
   * Renders the No Consult and Consult buttons
   * @param buttons - button information
   */
  renderButtons = (buttons: ConsultButtonType[]) => {
    const { activeConsultButtonIndex } = this.props;

    // @ts-ignore
    return buttons.map((button, i) => {
      const ref = React.createRef<HTMLButtonElement>();
      return (
        <Button
          ref={ref}
          onClick={() => this.onButtonClick(i)}
          active={activeConsultButtonIndex === i}
          key={`consult_button_${i + 1}`}
        >
          {button.value}
        </Button>
      );
    });
  };

  render() {
    const { consultWithAnotherAdvisorLabel, label, buttons, name } = this.props;

    return (
      <React.Fragment>
        <Field
          id={`classification_field_${name.toLowerCase()}`}
          role="group"
          aria-label={consultWithAnotherAdvisorLabel}
        >
          <Label>{label}</Label>
          <ButtonList>{this.renderButtons(buttons)}</ButtonList>
        </Field>
        <Line />
      </React.Fragment>
    );
  }
}

const selector = (ownProps: { name: string }) => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const { name } = ownProps;
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: { consultWithAnotherAdvisorLabel },
        },
      },
    },
    context,
  } = workflowData;
  const activeConsultButtonIndex = get(context, name, 0);
  const { updateField, trigger } = actions;
  return {
    consultWithAnotherAdvisorLabel,
    activeConsultButtonIndex,
    updateField,
    trigger,
  };
};

export default connect(
  React.memo(ConsultButton),
  selector
);
