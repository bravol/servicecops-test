import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models/todo';

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
    private apiService: ApiService,
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
      // Update existing todo
      this.apiService.getTodo(id).subscribe((todo) => {
        this.todo = todo;
        this.todoForm.patchValue(todo);
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
      if (id) {
        // Update todo
        todoData.id = id;
        todoData.userId = this.todo.userId;
        this.apiService.updateTodo(todoData.id, todoData).subscribe(() => {
          this.router.navigate(['/todos']);
        });
      } else {
        // Add new todo
        this.apiService.getTodos().subscribe((todos) => {
          todoData.id = Math.max(...todos.map((t) => t.id)) + 1;
          this.apiService.addTodo(todoData).subscribe(() => {
            this.router.navigate(['/todos']);
          });
        });
      }
    }
  }
}
