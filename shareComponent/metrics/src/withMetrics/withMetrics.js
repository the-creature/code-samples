import { withProps, compose, setPropTypes, lifecycle } from 'recompose';
import { exposeMetrics } from 'react-metrics';

/**
 * Gets the data needed for the dispatch function used in the lifecycle.
 * Relies on the propTypes to determine what data to look for in props
 * @module withMetrics
 * @param {Object} props - the current props for this mapper
 * @param {Object} types - the metrics propTypes to determine which data to deconstruct from props
 * @param {Function} dispatch - name of the metrics function to call
 * @returns {HOC} - {{metricsProps: {}, dispatch: *}}
 */
export const propsMapper = (props, types, dispatch) => {
  types = !!types ? types : {};
  const keys = Object.keys(types);
  const metricsProps = {};
  keys.map(key => Object.assign(metricsProps, { [key]: props[key] }));
  return {
    metricsProps,
    dispatch
  };
};

export const lifeCycleSpec = lifecycle({
  componentDidMount() {
    const { metrics, metricsProps, dispatch } = this.props;
    if (metricsProps && dispatch) {
      metrics[dispatch]([metricsProps]);
    }
  }
});

const withMetrics = (propTypes, dispatch) => {
  return compose(
    exposeMetrics,
    setPropTypes(propTypes),
    withProps(props => propsMapper(props, propTypes, dispatch)),
    lifeCycleSpec
  );
};

export default withMetrics;
