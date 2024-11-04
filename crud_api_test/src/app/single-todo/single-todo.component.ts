import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { selectLoading, selectTodoById } from '../todo-store/todo.selectors';
import { loadTodos } from '../todo-store/todo.actions';
import { AppState } from '../app.state';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css'],
})
export class SingleTodoComponent implements OnInit {
  todo$?: Observable<Todo | undefined>; // Observable for the todo
  loading$?: Observable<boolean>; // Observable for loading state

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the ID from the route
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    // Check if id is valid
    if (id) {
      // Dispatch action to load todos
      this.store.dispatch(loadTodos());

      // Select the todo by ID from the store
      this.todo$ = this.store.select(selectTodoById(id));
      this.loading$ = this.store.select(selectLoading);

      // Optionally, navigate if no todo is found
      this.todo$.subscribe((todo) => {
        if (!todo) {
          this.router.navigate(['/todos']);
        }
      });
    } else {
      this.router.navigate(['/todos']);
    }
  }
}
