import { createAction } from 'redux-actions';
import * as Actions from '../constants/actions';

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


// classic example from redux 
export function fetchPosts(subreddit) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    // dispatch(addTodo(subreddit))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
      response => response.json(),
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing a loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => console.log('An error occurred.', error)
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(addTodo(json))
      )
  }
}

