import React from 'react';
import { CallBarIcon, CallBarBar } from './CallBar_Styled';

/**
 * A bar component that displays an animated bar icon.
 */
const CallBarIconComponent = () => (
  <CallBarIcon aria-hidden="true">
    <CallBarBar />
    <CallBarBar />
    <CallBarBar />
    <CallBarBar />
  </CallBarIcon>
);

export default CallBarIconComponent;
