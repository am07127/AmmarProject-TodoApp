import {createAction, props} from '@ngrx/store';

import {ITodo } from '../../models/model';

// Action to trigger adding a todo
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: ITodo }>()
);

// Action to dispatch when API call succeeds
export const todoAdded = createAction(
  '[Todo] Todo Added Success',
  props<{ todo: ITodo }>()
);

// Action for API errors
export const todoAddFailed = createAction(
  '[Todo] Add Todo Failed',
  props<{ error: string }>()
);

// Action to load all todos
export const todoLoad = createAction(
  '[Todo] Load Todos'
);

// Action when todos are successfully loaded
export const todoLoaded = createAction(
  '[Todo] Todos Loaded Success',
  props<{ todos: ITodo[] }>()
);

// Optional: Action if loading todos fails
export const todoLoadFailed = createAction(
  '[Todo] Load Todos Failed',
  props<{ error: string }>()
);
