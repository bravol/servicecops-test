import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoState } from './todo.reducers';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectLoading = createSelector(
  selectTodoState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTodoState,
  (state) => state.error
);

export const selectTodoById = (id: number) =>
  createSelector(selectTodoState, (state: TodoState) =>
    state.todos.find((todo) => todo.id === id)
  );
