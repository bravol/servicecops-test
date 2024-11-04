import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { catchError, map, of, mergeMap } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() => {
        console.log('Effect triggered: Fetching todos...');
        return this.apiService.getTodos().pipe(
          map((todos) => {
            console.log('Todos loaded successfully:', todos);
            return TodoActions.loadTodosSuccess({ todos });
          }),
          catchError((error) => {
            console.error('Error loading todos:', error);
            return of(TodoActions.loadTodosFailure({ error }));
          })
        );
      })
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo), // Action for adding a todo
      mergeMap((action) =>
        this.apiService.addTodo(action.todo).pipe(
          map((todo) => TodoActions.addTodoSuccess({ todo })), // Dispatch success action
          catchError((error) => of(TodoActions.addTodoFailure({ error }))) // Dispatch failure action
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo), // Action for deleting a todo
      mergeMap((action) =>
        this.apiService.deleteTodo(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })), // Dispatch success action
          catchError((error) => of(TodoActions.deleteTodoFailure({ error }))) // Dispatch failure action
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo), // Action for updating a todo
      mergeMap((action) =>
        this.apiService.updateTodo(action.id, action.todo).pipe(
          map((todo) => TodoActions.updateTodoSuccess({ todo })), // Dispatch success action
          catchError((error) => of(TodoActions.updateTodoFailure({ error }))) // Dispatch failure action
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
