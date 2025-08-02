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
