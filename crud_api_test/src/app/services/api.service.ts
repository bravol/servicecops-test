import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl + id);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id);
  }

  updateTodo(id: String, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiUrl + id, todo);
  }
}