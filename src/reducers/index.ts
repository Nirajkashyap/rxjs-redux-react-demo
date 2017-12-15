import { combineReducers, Reducer } from 'redux';
import { combineEpics } from 'redux-observable';

import  { todos  } from './todos';
import { gettodosEpic } from '../actions/todos';
 

export interface RootState {
  todos: TodoStoreState;
  async: any;
}

export const rootReducer = combineReducers<RootState>({
  todos
});


export const rootEpic = combineEpics(
  gettodosEpic
);
// rebase comment added

export function registerReducer(store, name, reducer) {
  store.async[name] = reducer;
  store.replaceReducer(createReducer(store.async));
};

function createReducer (reducers) {
  return combineReducers({
    root: (state=null) => state,
    ...reducers
  });
}