import React, { FC } from 'react';
import { CalloutContainer, CalloutIcon } from './Callout_Styled';

interface CalloutProps {
  html: string;
}

/**
 * Allows for the creation of html strings as
 * dangerouslySetInnerHTML content.s
 * @param html - a string of html content.
 * @returns {{__html: *}}
 */
function createHtml(html: string) {
  return { __html: html };
}

/**
 * A callout component used to notify the user of
 * some reference or issue.
 * @param html - a string of html content.
 */
const CalloutComponent: FC<CalloutProps> = ({ html }) => (
  <CalloutContainer>
    <CalloutIcon />
    <p dangerouslySetInnerHTML={createHtml(html)} />
  </CalloutContainer>
);

export default CalloutComponent;
