import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrl: './single-todo.component.css',
})
export class SingleTodoComponent {
  todo: Todo = { id: 0, title: '', completed: false };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get the id
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.apiService.getTodo(id).subscribe((todo) => {
        if (todo) {
          this.todo = todo;
        } else {
          this.router.navigate(['/todos']);
        }
      });
    }
  }
}
