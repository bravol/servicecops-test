import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

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

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (valid) {
      console.log("Logging in with:", { username, password, rememberMe });
    }
  };

  return (
    <div className=" bg-gray-50 w-full h-screen pt-10">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

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

          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border ${
                confirmPasswordError ? "border-red-500" : "border-gray-300"
              } rounded-full`}
            />
            {confirmPasswordError && (
              <div className="text-red-500 text-sm">{confirmPasswordError}</div>
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
            className="w-full p-2 bg-blue-500 text-white rounded-full hover:bg-purple-500 "
          >
            SignUp
          </button>
          <div className=" flex items-center mt-2">
            Already have an account?
            <Link to="/" className="text-sm text-blue-500 underline ml-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
