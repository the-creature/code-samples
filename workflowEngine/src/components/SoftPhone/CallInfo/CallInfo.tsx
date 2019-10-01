import React, { FC, useContext } from 'react';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { Minutes, Minutes as Seconds } from '../SoftPhone_Styled';
import {
  CallInfo,
  CallerContent,
  ImgCallerIcon,
  CallerName,
  SpeakerIcon,
  CallCounterTop,
  CallCounterBottom,
  VisuallyHidden,
  TimeWrapper,
} from './CallInfo_Styled';

interface CallInfoProps {
  customerCallLabel: string;
  totalTimeOnCallLabel: string;
  totalTimeOnHoldLabel: string;
  callerIcon: string;
  minutes: string;
  seconds: string;
  onHold: string;
  onMute: string;
  startingCallerName: string;
  speakerIcon: string;
  phoneDimIcon: string;
  pauseDimIcon: string;
  muteIcon: string;
  mute: boolean;
  talkTimeMinutes: string;
  talkTimeSeconds: string;
  hold: boolean;
  holdTimeMinutes: string;
  holdTimeSeconds: string;
}

const CallInfoComponent: FC<CallInfoProps> = React.memo(
  ({
    customerCallLabel,
    totalTimeOnCallLabel,
    totalTimeOnHoldLabel,
    callerIcon,
    minutes,
    seconds,
    onHold,
    onMute,
    startingCallerName,
    speakerIcon,
    phoneDimIcon,
    pauseDimIcon,
    muteIcon,
    mute,
    talkTimeMinutes,
    talkTimeSeconds,
    hold,
    holdTimeMinutes,
    holdTimeSeconds,
  }) => {
    // check for on Hold or Mute, affect caller name field
    let nameField = startingCallerName;
    if (hold) {
      nameField = onHold;
    } else if (mute) {
      nameField = onMute;
    } else {
      nameField = startingCallerName;
    }

    return (
      <CallInfo>
        <CallerContent aria-label={customerCallLabel} role="group">
          <ImgCallerIcon src={callerIcon} aria-hidden="true" />
          <CallerName>
            <p aria-live="assertive"> {nameField} </p>
          </CallerName>
          <SpeakerIcon type={hold ? 'dim' : 'notDim'}>
            <img src={speakerIcon} aria-hidden="true" />
          </SpeakerIcon>

          <CallCounterTop role="timer" aria-label={totalTimeOnCallLabel}>
            <img src={mute ? muteIcon : phoneDimIcon} aria-hidden="true" />
            <TimeWrapper type={hold ? 'dim' : 'notDim'}>
              <Minutes>{talkTimeMinutes}</Minutes>
              <VisuallyHidden aria-hidden="true">{minutes}</VisuallyHidden>
              <span aria-hidden="true">:</span>
              <Seconds>{talkTimeSeconds}</Seconds>
              <VisuallyHidden aria-hidden="true">{seconds}</VisuallyHidden>
            </TimeWrapper>
          </CallCounterTop>

          <CallCounterBottom role="timer" aria-label={totalTimeOnHoldLabel}>
            <img src={pauseDimIcon} aria-hidden="true" />
            <TimeWrapper type={hold ? 'notDim' : 'dim'}>
              <Minutes>{holdTimeMinutes}</Minutes>
              <VisuallyHidden aria-hidden="true">{minutes}</VisuallyHidden>
              <span aria-hidden="true">:</span>
              <Seconds>{holdTimeSeconds}</Seconds>
              <VisuallyHidden aria-hidden="true">{seconds}</VisuallyHidden>
            </TimeWrapper>
          </CallCounterBottom>
        </CallerContent>
      </CallInfo>
    );
  }
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreSoftphone: {
        setup: {
          accessibilityLabels: { customerCallLabel, totalTimeOnCallLabel, totalTimeOnHoldLabel },
        },
        uiStrings: {
          boilerplate: { minutes, seconds, onHold, onMute },
          developerSpecified: { startingCallerIcon, startingCallerName },
        },
      },
    },
    context: {
      timers: { hold, holdTime, mute, talkTime },
    },
  } = workflowData;
  const callerIcon = require(`../../../static/${startingCallerIcon}`);
  const speakerIcon = require('../../../static/images/speaker.png');
  const phoneDimIcon = require('../../../static/images/phone_dim.png');
  const pauseDimIcon = require('../../../static/images/pause_dim.png');
  const muteIcon = require('../../../static/images/mute_mini.png');

  const holdTimeArray = (holdTime || '00:00').split(':');
  const talkTimeArray = (talkTime || '00:00').split(':');

  return {
    customerCallLabel,
    totalTimeOnCallLabel,
    totalTimeOnHoldLabel,
    callerIcon,
    minutes,
    seconds,
    onHold,
    onMute,
    startingCallerName,
    speakerIcon,
    phoneDimIcon,
    pauseDimIcon,
    muteIcon,
    mute,
    talkTimeMinutes: talkTimeArray[0],
    talkTimeSeconds: talkTimeArray[1],
    hold,
    holdTimeMinutes: holdTimeArray[0],
    holdTimeSeconds: holdTimeArray[1],
  };
};

export default connect(
  CallInfoComponent,
  selector
);
