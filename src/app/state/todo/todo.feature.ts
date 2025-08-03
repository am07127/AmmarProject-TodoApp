import { createFeature, createReducer, on } from '@ngrx/store';
import { ITodo } from '../../models/model';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import * as TodoActions from './todo.actions';

export interface TodoState extends EntityState<ITodo> {
  // No additional state for now
  loading: boolean;
  error: string | null;
}

export const todoAdapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>({
  selectId: (todo) => todo._id, // Make sure to specify ID field
});

export const initialTodoState: TodoState = todoAdapter.getInitialState({
  loading: false,
  error: null,
});

export const todoFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialTodoState,
    // When addTodo action is dispatched (before API call)
    on(TodoActions.addTodo, (state) => {
      return state; // Just return current state (no changes yet)
    }),

    // When todoAdded action is dispatched (after successful API response)
    on(TodoActions.todoAdded, (state, { todo }) => {
      return todoAdapter.addOne(todo, state); // Add the new todo from server
    }),

    // When todoAddFailed is dispatched
    on(TodoActions.todoAddFailed, (state, { error }) => {
      console.error('Error adding todo:', error);
      return state; // Just return current state (no changes on error)
    }),
    // Load Todos
    on(TodoActions.todoLoad, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(TodoActions.todoLoaded, (state, { todos }) =>
      todoAdapter.setAll(todos, {
        ...state,
        loading: false,
        error: null,
      })
    ),

    on(TodoActions.todoLoadFailed, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});

// Basic selectors
export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos,
  selectTotal: selectTodoTotal,
} = todoAdapter.getSelectors(todoFeature.selectTodosState);
