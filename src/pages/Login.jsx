import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, setIsGuest } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      const success = login(username.trim(), password.trim());
      if (success) navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Daily Habit Tracker
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black dark:text-white">
          Log In
        </h1>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full text-sm text-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          Need an account? Register
        </button>
        <button
          type="button"
          onClick={() => {
            setIsGuest(true);
            navigate("/");
          }}
          className="w-full text-sm text-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline"
        >
          Continue as Guest
        </button>
      </form>
    </div>
  );
}

export default Login;
