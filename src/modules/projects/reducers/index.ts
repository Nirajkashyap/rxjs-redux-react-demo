import { combineReducers, Reducer } from 'redux';
import { combineEpics } from 'redux-observable';

import  { projects  } from './project';
import { gettodosEpic } from '../actions/projects';
 


export interface ProjectState {
  // Projects: TodoStoreState;
  Projects: any;  
}

export const ProjectReducer = combineReducers<ProjectState>({
  projects
});


export const ProjectEpic = combineEpics(
  gettodosEpic
);
// rebase comment added

