import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaSpinner, FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Login() {
  const { login, setIsGuest } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setErrorMessage("");

    const result = await login(email.trim(), password.trim());

    setIsLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setErrorMessage(result.message || "Login failed");
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
        <h2 className="text-2xl font-bold text-center text-black dark:text-white">
          Log in
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        {errorMessage && (
          <div className="text-red-600 text-sm font-medium text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin h-4 w-4" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            className="text-blue-600 dark:text-blue-400 hover:underline"
            to="/register"
          >
            Register
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsGuest(true);
              navigate("/");
            }}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline"
          >
            Continue as Guest
          </button>

          <FaInfoCircle
            className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-pointer"
            data-tooltip-id="guest-tooltip"
            data-tooltip-content="Guest mode loads example habits and stores data in your browser. Changes won't sync across devices or persist after clearing browser data."
          />
        </div>
      </form>

      <Tooltip
        id="guest-tooltip"
        place="top"
        className="max-w-xs break-words text-sm px-3 py-2"
        style={{ whiteSpace: "normal" }}
      />
    </div>
  );
}

export default Login;
