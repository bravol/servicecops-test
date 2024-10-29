import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoFormComponent, TodoListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class TodosModule {}
