import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { TodosModule } from './todos/todos.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoReducer } from './todo-store/todo.reducers';
import { TodoEffects } from './todo-store/todo.effects';
import { AppState } from './app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    TodosModule,
    HttpClientModule,
    NgxPaginationModule,
    StoreModule.forRoot<AppState>({ todo: todoReducer }),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument(), // for debugging
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
