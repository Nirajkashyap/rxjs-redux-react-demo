import { combineReducers, Reducer } from 'redux';
import { combineEpics } from 'redux-observable';

import  { todos  } from './todos';
import { gettodosEpic } from '../actions/todos';
 

export interface RootState {
  todos: TodoStoreState;
}

export const rootReducer = combineReducers<RootState>({
  todos
});


export const rootEpic = combineEpics(
  gettodosEpic
);
// rebase comment added