import { applyMiddleware, createStore } from 'redux';
import { loadState } from './localStorage';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middleware = applyMiddleware(promise(), thunk, logger);

const persistedState = loadState();

export default createStore(reducer, persistedState,  middleware);