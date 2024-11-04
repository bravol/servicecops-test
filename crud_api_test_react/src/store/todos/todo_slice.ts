import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../service/models";

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    updateTodo: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Todo> }>
    ) => {
      const { id, updates } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(
        (todo) => todo.id?.toString() !== action.payload
      );
    },

    clearNotData: (state) => {
      state.todos = [];
    },
  },
});

export const { setTodos, addTodo, removeTodo, updateTodo, clearNotData } =
  TodoSlice.actions;

export const todoReducer = TodoSlice.reducer;
