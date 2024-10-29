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
    this.apiService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteReservation(id: string): void {
    this.apiService.deleteTodo(id).subscribe(() => {
      console.log('delete request proccessed');
    });
  }
}
