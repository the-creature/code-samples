import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import workflows from './workflow';

const rootReducer = combineReducers({
  router,
  // @ts-ignore
  workflows,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
