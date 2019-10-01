import React from 'react';
import { propsMapper, lifeCycleSpec } from './withMetrics';
import PropTypes from 'prop-types';

describe('withMetrics', () => {
  test('propsMapper should provide metricsProps', () => {
    const propTypes = {
      arrivalTime: PropTypes.string,
      isUpsell: PropTypes.bool
    };
    const props = {
      foo: 'bar',
      arrivalTime: '16:00',
      isUpsell: true
    };
    expect(propsMapper(props, propTypes, 'trackThePage')).toMatchSnapshot();
  });

  test('componentDidMount lifeCycleSpec with dispatch', () => {
    const props = {
      metrics: { trackThePage: jest.fn() },
      metricsProps: { foo: 'bar' },
      dispatch: 'trackThePage'
    };

    const BaseComponent = () => <div>Base Component</div>;
    BaseComponent.displayName = 'TestBaseComponent';

    const EnhancedComponent = lifeCycleSpec(BaseComponent);
    mount(<EnhancedComponent {...props} />);

    expect(props.metrics.trackThePage).toHaveBeenCalledWith([props.metricsProps]);
  });

  test('componentDidMount lifeCycleSpec without dispatch', () => {
    const props = {
      metrics: { trackThePage: jest.fn() }
    };

    const BaseComponent = () => <div>Base Component</div>;
    BaseComponent.displayName = 'TestBaseComponent';

    const EnhancedComponent = lifeCycleSpec(BaseComponent);
    mount(<EnhancedComponent {...props} />);

    expect(props.metrics.trackThePage).not.toHaveBeenCalled();
  });
});
