import React, { FC, useContext } from 'react';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { HoldMuteProps, WorkflowEvent } from '../../../redux/modules/workflow';
import {
  CallPlayBar,
  PhoneButton,
  PauseButton,
  MuteButton,
  InfoButton,
  DialButton,
} from './CallPlayBar_Styled';

interface CallPlayBarProps {
  hold: boolean;
  mute: boolean;
  showInfoPopup: boolean;
  dialIcon: string;
  infoIcon: string;
  muteIcon: string;
  pauseIcon: string;
  phoneIcon: string;
  callInfoButtonTitle: string;
  holdButtonTitle: string;
  releaseButtonTitle: string;
  toggleMuteButtonTitle: string;
  touchtoneKeypadButtonTitle: string;
  trigger: (data: WorkflowEvent) => void;
  showInfo: () => void;
  hideInfo: () => void;
  startMute: (data: HoldMuteProps) => void;
  stopMute: (data: HoldMuteProps) => void;
  startHold: (data: HoldMuteProps) => void;
  stopHold: (data: HoldMuteProps) => void;
}

const CallPlayBarComponent: FC<CallPlayBarProps> = React.memo(
  ({
    hold,
    mute,
    showInfoPopup,
    dialIcon,
    infoIcon,
    muteIcon,
    pauseIcon,
    phoneIcon,
    callInfoButtonTitle,
    holdButtonTitle,
    releaseButtonTitle,
    toggleMuteButtonTitle,
    touchtoneKeypadButtonTitle,
    trigger,
    showInfo,
    hideInfo,
    startMute,
    stopMute,
    startHold,
    stopHold,
  }) => (
    <CallPlayBar id="callPlayBar">
      <DialButton
        id="dial-button"
        title={touchtoneKeypadButtonTitle}
        onClick={() => {
          trigger({
            name: 'dial-button',
            type: 'click',
          });
        }}
      >
        <span>
          <img src={dialIcon} aria-hidden="true" />
        </span>
      </DialButton>
      <InfoButton
        id={`info-button-${showInfoPopup ? 'on' : 'off'}`}
        isFocus={showInfoPopup}
        title={callInfoButtonTitle}
        onClick={() => {
          if (showInfoPopup === true) {
            hideInfo();
          } else {
            showInfo();
          }

          trigger({
            name: `info-button-${showInfoPopup ? 'on' : 'off'}`,
            type: 'click',
          });
        }}
      >
        <span>
          <img id="info-button-img" src={infoIcon} aria-hidden="true" />
        </span>
      </InfoButton>
      <MuteButton
        id={`mute-button-${mute ? 'on' : 'off'}`}
        isFocus={mute}
        title={toggleMuteButtonTitle}
        onClick={() => {
          if (mute) {
            stopMute({
              hold: false,
              mute: false,
            });
          } else {
            startMute({
              hold: false,
              mute: true,
            });
          }

          trigger({
            name: `mute-button-${mute ? 'on' : 'off'}`,
            type: 'click',
          });
        }}
      >
        <span>
          <img src={muteIcon} aria-hidden="true" />
        </span>
      </MuteButton>
      <PauseButton
        id={`pause-button-${hold ? 'on' : 'off'}`}
        isFocus={hold}
        title={holdButtonTitle}
        onClick={() => {
          if (hold) {
            stopHold({
              hold: false,
              mute: false,
            });
          } else {
            startHold({
              hold: true,
              mute: false,
            });
          }
          trigger({
            name: `pause-button-${hold ? 'on' : 'off'}`,
            type: 'click',
          });
        }}
      >
        <span>
          <img src={pauseIcon} aria-hidden="true" />
        </span>
      </PauseButton>
      <PhoneButton
        id="phone_button"
        title={releaseButtonTitle}
        onClick={() => {
          trigger({
            name: 'phone-button',
            type: 'click',
          });
        }}
      >
        <span>
          <img src={phoneIcon} aria-hidden="true" />
        </span>
      </PhoneButton>
    </CallPlayBar>
  )
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreSoftphone: {
        setup: {
          accessibilityLabels: {
            callInfoButtonTitle,
            holdButtonTitle,
            releaseButtonTitle,
            toggleMuteButtonTitle,
            touchtoneKeypadButtonTitle,
          },
        },
      },
    },
    context: {
      timers: { hold, mute, showInfoPopup },
    },
  } = workflowData;

  const { trigger, showInfo, hideInfo, startMute, stopMute, startHold, stopHold } = actions;

  const dialIcon = require('../../../static/images/dial.png');
  const infoIcon = require('../../../static/images/info.png');
  const muteIcon = require('../../../static/images/mute.png');
  const pauseIcon = require(`../../../static/images/pause.png`);
  const phoneIcon = require('../../../static/images/phone.png');

  return {
    hold,
    mute,
    showInfoPopup,
    dialIcon,
    infoIcon,
    muteIcon,
    pauseIcon,
    phoneIcon,
    callInfoButtonTitle,
    holdButtonTitle,
    releaseButtonTitle,
    toggleMuteButtonTitle,
    touchtoneKeypadButtonTitle,
    trigger,
    showInfo,
    hideInfo,
    startMute,
    stopMute,
    startHold,
    stopHold,
  };
};

export default connect(
  CallPlayBarComponent,
  selector
);
