import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../store/todos/todo_slice";
import { RootState } from "../store";
import Pagination from "../components/pagination";
import Welcome from "../components/welcome";
import showToast from "../utils/Alert";

const Todos: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const handleDelete = (id: string) => {
    dispatch(removeTodo(id));
    showToast("Todo Deleted Successfully", "success");
  };

  const paginatedTodos = todos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <Welcome />
      <hr />
      <h3 className="mt-5 mb-3">Todo List</h3>

      <table className="table table-hover table-vcenter text-nowrap">
        <thead>
          <tr>
            <th>Todo Id</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={todo.completed}
                  disabled
                />
              </td>
              <td>
                <Link
                  to={`/todo/${todo.id}`}
                  className="btn btn-sm btn-success mx-1"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${todo.id}`}
                  className="btn btn-sm btn-warning mx-1"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={() => handleDelete(todo.id.toString())}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <Pagination
        todos={todos}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Todos;
