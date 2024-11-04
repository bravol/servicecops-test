import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../utils/app-routes";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center my-3">
      <h2>Welcome to Todo Portal!</h2>
      <button
        className="btn btn-primary mx-2"
        onClick={() => navigate(AppRoutes.ADD_TODO)}
      >
        Create Todo
      </button>
      <button
        className="btn btn-primary mx-2"
        onClick={() => navigate(AppRoutes.TODOS)}
      >
        View All Todos
      </button>
    </div>
  );
};

export default Welcome;
