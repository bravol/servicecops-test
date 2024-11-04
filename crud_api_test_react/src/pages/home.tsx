import { useEffect } from "react";
import Welcome from "../components/welcome";
import { ApiService } from "../service/api_service";
import { useDispatch } from "react-redux";
import { setTodos } from "../store/todos/todo_slice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getTodos = async () => {
      const todos = await ApiService.getTodos();
      if (todos) {
        dispatch(setTodos(todos));
      }
    };
    getTodos();
  }, []);
  return (
    <div className="container">
      <Welcome />
    </div>
  );
};

export default Home;
