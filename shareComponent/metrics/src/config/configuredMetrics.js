import { metrics } from 'react-metrics';

/**
 * Returns configured HOC for react-metrics
 * @module configuredMetrics
 * @function
 * @param {Object} metricsConfig
 * @returns {HOC} to be applied to root component (<App /> probably)
 */

const configuredMetrics = metricsConfig => metrics(metricsConfig, { autoTrackPageView: false });

export default configuredMetrics;
