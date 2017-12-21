import { createAction } from 'redux-actions';
import * as Actions from './../constants/actions';

import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map,mergeMap } from 'rxjs/operators';

import 'rxjs';


export const addTodo = createAction<TodoItemData>(Actions.ADD_TODO);
export const getTodos = createAction<TodoItemData>(Actions.GET_TODOS);
export const getTodo = createAction<TodoItemData>(Actions.GET_TODO);
export const completeAll = createAction(Actions.COMPLETE_ALL);
export const editTodo = createAction<TodoItemId>(Actions.EDIT_TODO);
export const completeTodo = createAction<TodoItemId>(Actions.COMPLETE_TODO);
export const clearCompleted = createAction(Actions.CLEAR_COMPLETED);

export const deleteTodo = createAction<TodoItemId>(Actions.DELETE_TODO);

//  example of https://redux-observable.js.org/docs/basics/Epics.html 
export const gettodosEpic = action$ =>
  action$.ofType(Actions.GET_TODOS)
    .mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload}`)
        .map(response => addTodo(response))
    );


