/**
 * Returns configuration object for react-metrics
 * @module metricsConfig
 * @function
 * @param {Object} config variables
 * const config = {
     debug: false,
     digitalData: projectSpecificObject
     Interface: ExtentedAdobeTagManager.js (class)
     seedFile: 'https://example.com/example.js'
     server: false // (likely set by your !!SERVER variable)
 * }
 * @returns {Object} configuration
 */

const metricsConfig = ({ debug, digitalData, Interface, seedFile, server }) => ({
  enabled: true,
  vendors: [
    {
      name: 'Adobe Tag Manager',
      api: new Interface({
        debug,
        digitalData,
        seedFile,
        server
      })
    }
  ],
  debug
});

export default metricsConfig;
