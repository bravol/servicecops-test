import { TodoState } from './todo-store/todo.reducers';

export interface AppState {
  readonly todo: TodoState;
}
