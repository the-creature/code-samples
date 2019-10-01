import React, { FC, useContext } from 'react';
import get from 'lodash.get';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { Minutes, Minutes as Seconds } from '../SoftPhone_Styled';
import { CallBarTimer, VisuallyHidden } from './CallBar_Styled';

interface CallBarTimerProps {
  minutes: string;
  seconds: string;
  minutesValue: string;
  secondsValue: string;
  totalCallTimeLabel: string;
}

/**
 * A timer component.
 */
const CallBarTimerComponent: FC<CallBarTimerProps> = React.memo(
  ({ minutes, seconds, minutesValue, secondsValue, totalCallTimeLabel }) => (
    <CallBarTimer role="timer" aria-label={totalCallTimeLabel}>
      <Minutes>{minutesValue}</Minutes>
      <VisuallyHidden aria-hidden="true">{minutes}</VisuallyHidden>
      <span aria-hidden="true">:</span>
      <Seconds>{secondsValue}</Seconds>
      <VisuallyHidden aria-hidden="true">{seconds}</VisuallyHidden>
    </CallBarTimer>
  )
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreSoftphone: {
        setup: {
          accessibilityLabels: { totalCallTimeLabel },
        },
        uiStrings: {
          boilerplate: { minutes, seconds },
        },
      },
    },
    context: { timers },
  } = workflowData;
  const timeDisplay = get(timers, 'sessionTime', '00:00');
  const timeArray = timeDisplay.split(':');

  return {
    minutes,
    seconds,
    minutesValue: timeArray[0],
    secondsValue: timeArray[1],
    totalCallTimeLabel,
  };
};

export default connect(
  CallBarTimerComponent,
  selector
);
