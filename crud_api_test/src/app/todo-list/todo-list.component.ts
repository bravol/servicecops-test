import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { selectTodos, selectLoading } from '../todo-store/todo.selectors'; // Include loading selector
import { AppState } from '../app.state';
import { deleteTodo, loadTodos } from '../todo-store/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>; // Observable for loading state
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private store: Store<AppState>) {
    this.todos$ = store.select(selectTodos);
    this.loading$ = store.select(selectLoading); // Get loading state as observable
  }

  ngOnInit(): void {
    // Dispatch an action to load todos when the component initializes
    this.store.dispatch(loadTodos());
  }

  deleteTodo(id: number): void {
    // Dispatch an action to delete a todo
    this.store.dispatch(deleteTodo({ id }));
  }
}
