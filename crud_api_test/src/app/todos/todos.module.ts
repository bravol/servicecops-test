import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';



@NgModule({
  declarations: [
    TodoFormComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TodosModule { }
