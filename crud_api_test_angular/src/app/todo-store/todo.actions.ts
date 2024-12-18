import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo';

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

// Add Todo
export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: any }>()
);

// Delete Todo
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: number }>()
);
export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: any }>()
);

// Update Todo
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ id: number; todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: any }>()
);
