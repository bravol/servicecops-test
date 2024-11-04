import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models/todo';
import * as TodoActions from '../todo-store/todo.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { selectTodos } from '../todo-store/todo.selectors';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({});
  todo: Todo = { userId: 1, id: 0, title: '', completed: false };
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3),
        ],
      ],
      completed: [false],
    });

    // Check if there's an 'id' in the route to distinguish between add and update
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      // Load the todo from the store if editing
      this.store
        .select(selectTodos)
        .pipe(
          tap((todos) => {
            const todoToEdit = todos.find((todo) => todo.id === id);
            if (todoToEdit) {
              this.todo = todoToEdit;
              this.todoForm.patchValue(todoToEdit);
            } else {
              // Optionally: Dispatch an action to load todos if not present
              this.store.dispatch(TodoActions.loadTodos());
            }
          })
        )
        .subscribe();
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const todoData: Todo = {
        ...this.todoForm.value,
        userId: 1,
      };

      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      if (id) {
        // Update todo
        todoData.id = id;
        todoData.userId = this.todo.userId;
        this.store.dispatch(
          TodoActions.updateTodo({ id: todoData.id, todo: todoData })
        );
        this.router.navigate(['/todos']);
      } else {
        // Add new todo
        this.store
          .select(selectTodos)
          .pipe(
            tap((todos) => {
              todoData.id = Math.max(...todos.map((t) => t.id)) + 1;
              this.store.dispatch(TodoActions.addTodo({ todo: todoData }));
              this.router.navigate(['/todos']);
            })
          )
          .subscribe();
      }
    }
  }
}
