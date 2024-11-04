import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Todos from "./pages/Todos";
import AddTodo from "./pages/AddTodo";
import Todo from "./pages/Todo";
import { AppRoutes } from "./utils/app-routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route path={AppRoutes.TODOS} element={<Todos />} />
        <Route path={AppRoutes.ADD_TODO} element={<AddTodo />} />
        <Route path={AppRoutes.EDIT_TODO + "/:id"} element={<AddTodo />} />
        <Route path={AppRoutes.TODO + "/:id"} element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
