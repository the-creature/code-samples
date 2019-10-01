let config;

if (process.env.NODE_ENV === 'production') {
  config = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
  config = require('./configureStore.dev'); // eslint-disable-line global-require
}

const { configureStore, history, StoreState } = config;

export { configureStore, history, StoreState };