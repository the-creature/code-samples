import React, { FC, useContext } from 'react';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import {
  CallInfoPopup,
  CallInfoTail,
  CallInfoContent,
  CallInfoTopRow,
  CallInfoIcon,
  CallInfoContentSection,
  CallInfoUser,
  CallInfoCallInfo,
  CallInfoTimeSection,
  CallInfoTotalOnCall,
  CallInfoTotalCallTimer,
  CallInfoTotalOnHold,
  CallInfoTotalOnHoldTimer,
  CallInfoBottomRow,
  CallInfoTransfers,
  CallInfoTransfersBody,
  CallInfoTransferNumber,
  CallInfoWait,
  CallInfoWaitBody,
  CallInfoTotalWaitTimer,
  CallInfoTalk,
  CallInfoTalkBody,
  CallInfoTotalTalkTimer,
} from './CallInfoPopup_Styled';

interface CallInfoPopupProps {
  startingCallerName: string;
  showInfoPopup: boolean;
  callInfoTail: string;
  orangeArrow: string;
  phoneDim: string;
  clockDim: string;
}

const CallInfoPopupComponent: FC<CallInfoPopupProps> = React.memo(
  ({ startingCallerName, showInfoPopup, callInfoTail, orangeArrow, phoneDim, clockDim }) => (
    // all <p></p> content must be replaced with dynamic XML CallerContent
    // all timers and counters must be replaced with functions
    <CallInfoPopup style={{ display: showInfoPopup ? 'block' : 'none' }}>
      <CallInfoTail>
        <img id="callinfo-tail" src={callInfoTail} aria-hidden="true" />
      </CallInfoTail>
      <CallInfoContent>
        <CallInfoTopRow>
          <CallInfoIcon>
            <img id="callinfo-arrow" src={orangeArrow} aria-hidden="true" />
          </CallInfoIcon>
          <CallInfoContentSection>
            <CallInfoUser>
              <p>{startingCallerName}</p>
            </CallInfoUser>
            <CallInfoCallInfo>
              <p>Training and Reporting 012 (Incoming Call)</p>
            </CallInfoCallInfo>
          </CallInfoContentSection>

          <CallInfoTimeSection>
            <CallInfoTotalOnCall>
              <img id="callinfo-phone-icon" src={phoneDim} aria-hidden="true" />
              <CallInfoTotalCallTimer>
                <p>--:--</p>
              </CallInfoTotalCallTimer>
            </CallInfoTotalOnCall>
            <CallInfoTotalOnHold>
              <img id="callinfo-clock-icon" src={clockDim} aria-hidden="true" />
              <CallInfoTotalOnHoldTimer>
                <p>--:--</p>
              </CallInfoTotalOnHoldTimer>
            </CallInfoTotalOnHold>
          </CallInfoTimeSection>
        </CallInfoTopRow>

        <CallInfoBottomRow>
          <CallInfoTransfers>
            <CallInfoTransfersBody>
              <p>transfers</p>
            </CallInfoTransfersBody>
            <CallInfoTransferNumber>
              <p>0</p>
            </CallInfoTransferNumber>
          </CallInfoTransfers>
          <CallInfoWait>
            <CallInfoWaitBody>
              <p>wait</p>
            </CallInfoWaitBody>
            <CallInfoTotalWaitTimer>
              <p>--:--</p>
            </CallInfoTotalWaitTimer>
          </CallInfoWait>
          <CallInfoTalk>
            <CallInfoTalkBody>
              <p>talk</p>
            </CallInfoTalkBody>
            <CallInfoTotalTalkTimer>
              <p>--:--</p>
            </CallInfoTotalTalkTimer>
          </CallInfoTalk>
        </CallInfoBottomRow>
      </CallInfoContent>
    </CallInfoPopup>
  )
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreSoftphone: {
        uiStrings: {
          developerSpecified: { startingCallerName },
        },
      },
    },
    context: {
      timers: { showInfoPopup },
    },
  } = workflowData;

  const callInfoTail = require('../../../static/images/callInfo_tail.png');
  const orangeArrow = require('../../../static/images/orange_arrow.png');
  const phoneDim = require('../../../static/images/phone_dim.png');
  const clockDim = require('../../../static/images/clock_dim.png');

  return {
    startingCallerName,
    showInfoPopup,
    callInfoTail,
    orangeArrow,
    phoneDim,
    clockDim,
  };
};

export default connect(
  CallInfoPopupComponent,
  selector
);
