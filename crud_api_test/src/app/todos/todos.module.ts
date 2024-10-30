import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { SingleTodoComponent } from '../single-todo/single-todo.component';
import { NgxPaginationModule } from 'ngx-pagination'; // Import here

@NgModule({
  declarations: [TodoFormComponent, TodoListComponent, SingleTodoComponent],
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
