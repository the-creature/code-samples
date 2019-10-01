import React, { FC, useContext, useEffect, useRef } from 'react';
import { SoftPhone } from './SoftPhone_Styled';
import CallBar from './CallBar/CallBar';
import CallInfo from './CallInfo/CallInfo';
import CallPlayBar from './CallPlayBar/CallPlayBar';
import WorkflowContext, { connect } from '../../shared-components/WorkflowContext/WorkflowContext';
import CallInfoPopup from './CallInfoPopup/CallInfoPopup';

// TODO: review A/Cs
// Last year when they stepped back,
// they wanted the clocks to reset to the time
// they were during that previous step. So to keep
// track of the times are updating them
// through the store.

interface SoftphoneProps {
  incrementTime: () => void;
}

/**
 * The SoftPhone component is a smart component to replicate the
 * functionality of Core's softphone component interface.
 */

const SoftPhoneComponent: FC<SoftphoneProps> = ({ incrementTime }) => {
  const intervalRef = useRef<number>();

  useEffect(() => {
    const id = setInterval(() => {
      incrementTime();
    }, 1000);
    intervalRef.current = id;

    return () => {
      clearInterval(intervalRef.current);
    };
  });

  return (
    <>
      <CallInfoPopup />
      <SoftPhone>
        <CallBar />
        <CallInfo />
        <CallPlayBar />
      </SoftPhone>
    </>
  );
};

const selector = () => {
  const { actions } = useContext(WorkflowContext);
  const { incrementTime } = actions;

  return {
    incrementTime,
  };
};

export default connect(
  React.memo(SoftPhoneComponent),
  selector
);
