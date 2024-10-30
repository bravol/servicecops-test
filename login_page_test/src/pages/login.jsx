import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");

    let valid = true;

    // Validate username
    if (!username) {
      setUsernameError("Username is required.");
      valid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (valid) {
      console.log("Logging in with:", { username, password, rememberMe });
    }
  };

  return (
    <div className=" bg-blue-500 w-full h-screen pt-10">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 border ${
                usernameError ? "border-red-400" : "border-gray-300"
              } rounded-full`}
            />
            {usernameError && (
              <div className=" text-red-400 text-sm">{usernameError}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-full`}
            />
            {passwordError && (
              <div className="text-red-500 text-sm">{passwordError}</div>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-full hover:bg-blue-400"
          >
            Login
          </button>
          <div className=" flex items-center justify-end mt-2">
            <a href="#" className="text-sm text-blue-500 underline">
              Forgot Password?
            </a>
          </div>
        </form>

        <button className=" w-full flex items-center justify-center p-2 gap-5 border rounded-full my-3">
          <FcGoogle size={25} /> Login with Google
        </button>
        <button className=" w-full flex items-center justify-center gap-5 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-400">
          <FaFacebookF /> Login with Facebook
        </button>
        <div className=" flex items-center mt-2">
          Do not have an account
          <Link to="/signup" className="text-sm text-blue-500 underline ml-2">
            SignUp?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
