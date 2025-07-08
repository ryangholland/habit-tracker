import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

function Register() {
  const { register, setIsGuest } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) return;

    setIsLoading(true);
    setErrorMessage("");

    const result = await register(
      username.trim(),
      email.trim(),
      password.trim()
    );

    await new Promise((res) => setTimeout(res, 250));
    setIsLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setErrorMessage(result.message || "Registration failed");
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
          Register
        </h1>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="password"
          placeholder="Choose a password"
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
          className="w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin h-4 w-4" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full text-sm text-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          Already have an account? Log in
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

export default Register;
