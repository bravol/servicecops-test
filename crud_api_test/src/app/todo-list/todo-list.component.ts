import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  todos: Todo[] = [];

  ngOnInit(): void {
    this.apiService.getTodos(5).subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteTodo(id: number): void {
    this.apiService.deleteTodo(id).subscribe(() => {});
  }
}
