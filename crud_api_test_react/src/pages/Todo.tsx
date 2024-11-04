import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useParams } from "react-router-dom";
import Welcome from "../components/welcome";

const Todo: React.FC = () => {
  const todoId = useParams().id;
  const todos = useSelector((state: RootState) => state.todo.todos);
  const todo = todos.find((todo) => todo.id.toString() === todoId);

  return (
    <div className="container">
      <Welcome />
      <hr />
      <h1>Todo Details</h1>
      <div className="todo-container p-3 ">
        <div className="todo-card">
          <p className="fw-bold mb-1">Todo ID:</p>
          <p className="todo-value">{todo?.id || "N/A"}</p>

          <p className="fw-bold mb-1">Title:</p>
          <p className="todo-value">{todo?.title || "N/A"}</p>

          <p className="fw-bold mb-1">Completed:</p>
          <input
            className="form-check-input"
            type="checkbox"
            checked={todo?.completed || false}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
