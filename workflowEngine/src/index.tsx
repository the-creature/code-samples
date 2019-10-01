import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { configureStore, history } from './redux/store/configureStore';

// @ts-ignore
export const store = configureStore();

render(<App store={store} history={history} />, document.getElementById('root'));
