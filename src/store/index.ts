import { createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { composeWithDevTools } from "redux-devtools-extension";

import { logger } from '../middleware';

import  { rootReducer,  RootState, rootEpic } from '../reducers';


const epicMiddleware = createEpicMiddleware(rootEpic);


export function configureStore(initialState?: RootState) {
  let middleware = applyMiddleware(logger,epicMiddleware);

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
