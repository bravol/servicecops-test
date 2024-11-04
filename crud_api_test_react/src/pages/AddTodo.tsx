import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../store/todos/todo_slice";
import { RootState } from "../store";
import { ApiService } from "../service/api_service";
import Welcome from "../components/welcome";
import { useParams, useNavigate } from "react-router-dom";
import showToast from "../utils/Alert";

const AddTodo: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Determine if we're in edit mode and find the existing todo if applicable
  const existingTodo = id
    ? todos.find((todo) => todo.id.toString() === id)
    : null;

  // Set initial state based on edit mode
  const [title, setTitle] = useState(existingTodo ? existingTodo.title : "");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingTodo) {
      setTitle(existingTodo.title); // Set title to existing todo's title when editing
    }
  }, [existingTodo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (existingTodo) {
      // Update existing todo
      const updatedTodo = { ...existingTodo, title };
      await ApiService.updateTodo(Number(id), updatedTodo);
      dispatch(updateTodo({ id: existingTodo.id, updates: { title } }));
      showToast("Tod Updated successfully", "success");
    } else {
      // Add new todo
      const newTodo = {
        id: todos.length + 1,
        userId: 1,
        title,
        completed: false,
      };
      await ApiService.createTodo(newTodo);
      dispatch(addTodo(newTodo));
      showToast("Tod added successfully", "success");
    }
    setLoading(false);

    setTitle("");
    setTouched(false);
    navigate("/todos"); // Navigate back to the todos
  };

  return (
    <div className="container">
      <Welcome />
      <hr />

      <h1>{existingTodo ? "Edit Todo" : "Add Todo"}</h1>

      <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className={`form-control ${touched && !title ? "is-invalid" : ""}`}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          {touched && !title && (
            <div className="invalid-feedback">Title is required</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!title || loading}
        >
          {loading
            ? "Submitting..."
            : existingTodo
            ? "Update Todo"
            : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
