import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/todos/';

  constructor(private http: HttpClient) {}

  getTodos(limit: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?_limit=${limit}`);
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl + id);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id);
  }

  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl + id, todo);
  }
}
