import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todos', component: TodoListComponent },
  { path: 'create', component: TodoFormComponent },
  { path: 'edit/:id', component: TodoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
