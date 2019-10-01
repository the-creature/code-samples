import React, { FC, memo, useContext } from 'react';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import ExpandLink from '../../../../../shared-components/ExpandLink/ExpandLink';
import { WorkflowEvent } from '../../../../../redux/modules/workflow';

interface TroubleShootProps {
  id: string;
  hasFocus: boolean;
  label: string;
  name: string;
  trigger: (data: WorkflowEvent) => void;
}

// Renders the Troubleshoot component
const TroubleShootComponent: FC<TroubleShootProps> = ({ id, hasFocus, label, name, trigger }) => {
  return (
    <ExpandLink
      id={id}
      onClick={() => {
        trigger({
          name,
          type: 'click',
        });
      }}
      text={label}
      hasFocus={hasFocus}
      disabled
    />
  );
};

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        data: {
          troubleShooting: {
            expand: { name, label },
          },
        },
      },
    },
    context: { focus },
  } = workflowData;

  const { trigger } = actions;
  const id = 'continue-to-troubleshoot';

  return {
    id,
    hasFocus: focus === id,
    label,
    name,
    trigger,
  };
};

export default connect(
  memo(TroubleShootComponent),
  selector
);
