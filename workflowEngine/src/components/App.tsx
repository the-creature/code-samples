import React, { FC } from 'react';
import { History } from 'history';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppState } from '../redux/modules/reducers';
import Routes from './Routes';

interface AppProps {
  store: Store<AppState>;
  history: History;
}

const App: FC<AppProps> = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
