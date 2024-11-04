import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SingleTodoComponent } from '../single-todo/single-todo.component';

@NgModule({
  declarations: [TodoListComponent, TodoFormComponent, SingleTodoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HomeModule,
    NgxPaginationModule,
  ],
})
export class TodosModule {}
