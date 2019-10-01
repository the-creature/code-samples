import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer, { AppState } from '../modules/reducers';

const history = createHashHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

const configureStore = (initialState: AppState): Store<AppState> => {
  return createStore(rootReducer, initialState, enhancer);
};

export { configureStore, history };
