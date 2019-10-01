import React from 'react';
import Loading from './Loading_Styled';
const loaderIcon = require('../../static/icons/loader.svg');

/**
 * A loading component that displays an animated loading icon.
 * Used as a placeholder for components while they're loading
 * async data from the server.
 */
const LoadingComponent = () => (
  <Loading>
    <img src={loaderIcon} alt="Loading icon" />
  </Loading>
);

export default LoadingComponent;
