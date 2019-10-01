import React, { FC } from 'react';
import CallBarIcon from './CallBarIcon';
import CallBarTimer from './CallBarTimer';
import { CallBarGreen } from './CallBar_Styled';

const CallBarComponent: FC = () => (
  <CallBarGreen>
    <CallBarIcon />
    <CallBarTimer />
  </CallBarGreen>
);

export default CallBarComponent;
