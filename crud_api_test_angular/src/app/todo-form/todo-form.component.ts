import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models/todo';
import * as TodoActions from '../todo-store/todo.actions';
import { selectTodos } from '../todo-store/todo.selectors';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
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
  }

  ngOnInit(): void {
    // Check if there's an 'id' in the route to distinguish between add and update
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      // Load the todo from the store if editing
      this.store
        .select(selectTodos)
        .pipe(take(1)) // Use take(1) to automatically unsubscribe
        .subscribe((todos) => {
          const todoToEdit = todos.find((todo) => todo.id === id);
          if (todoToEdit) {
            this.todoForm.patchValue(todoToEdit);
          } else {
            this.store.dispatch(TodoActions.loadTodos());
          }
        });
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const todoData: Todo = {
        ...this.todoForm.value,
        userId: 1,
      };

      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      if (this.isEditMode && id) {
        // Update todo
        todoData.id = id; // Ensure ID is included in the update
        this.store.dispatch(
          TodoActions.updateTodo({ id: todoData.id, todo: todoData })
        );
        this.openSnackBar('Todo updated successfully!'); // Notify user on edit
      } else {
        // Add new todo
        this.store.dispatch(TodoActions.addTodo({ todo: todoData }));
        this.openSnackBar('Todo Added successfully!'); // Notify user on add
      }

      // Navigate back to the todos list after dispatching the action
      this.router.navigate(['/todos']);
    }
  }

  // Method to open Snackbar
  openSnackBar(message: string, action: string = 'Close') {
    this.snackbar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
