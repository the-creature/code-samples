import React, { FC, memo, useContext } from 'react';
import isEmpty from 'lodash.isempty';
import WorkflowContext, { connect } from '../WorkflowContext/WorkflowContext';
import { WorkflowDataType } from '../../redux/modules/workflow';
import { Message, FieldWrapper } from './Message_Styled';

interface MessageProps {
  ariaConfig?: { [key: string]: string };
  id?: string;
  fieldType?: string;
  error?: string;
  errorPosition?: string;
  requiredLabel: string;
}

const ArrowIcon = ({ ariaLabel }: { ariaLabel: string }) => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" aria-label={ariaLabel}>
    <path
      fill="#ff0000"
      d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z"
    />
  </svg>
);

/**
 * The Message component is used to render error messages in form fields.
 *
 * @param children - message content
 */
const MessageComponent: FC<MessageProps> = ({
  ariaConfig = {},
  id,
  error,
  errorPosition = 'bottom',
  children,
  requiredLabel,
}) => {
  const errorProps = isEmpty(error)
    ? {}
    : {
        'data-error': error,
        'data-error-position': errorPosition,
      };
  return (
    <Message id={id} {...ariaConfig}>
      <FieldWrapper {...errorProps}>{children}</FieldWrapper>
      {!isEmpty(error) && <ArrowIcon ariaLabel={requiredLabel} />}
    </Message>
  );
};

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: { requiredLabel },
        },
      },
    },
  } = workflowData as WorkflowDataType;

  return {
    requiredLabel,
  };
};

export default connect(
  memo(MessageComponent),
  selector
);
