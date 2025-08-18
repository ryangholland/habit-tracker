import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiLogOut, FiUser } from "react-icons/fi";

function Header() {
  const { user, isGuest, logout, setIsGuest } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayName = isGuest
    ? "Guest"
    : user?.email?.split("@")[0] || "Account";

  const handleLogout = async () => {
    if (isGuest) {
      setIsGuest(false);
      navigate("/login");
      return;
    }
    await logout();
    navigate("/login");
  };

  return (
    <header className="w-full sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      <div className="max-w-6xl mx-auto h-14 px-4 flex items-center justify-between">
        {/* Left: app/brand */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="font-semibold text-gray-900 dark:text-white text-lg"
          >
            Daily Habit Tracker
          </Link>
        </div>

        {/* Right: settings + user menu */}
        <div className="flex items-center gap-4">
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            aria-label="Settings"
            title="Settings"
          >
            <FiSettings className="h-5 w-5" />
          </Link>

          <div className="flex items-center gap-2">
            <FiUser className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {displayName}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            aria-label={isGuest ? "Exit Guest Mode" : "Log out"}
            title={isGuest ? "Exit Guest Mode" : "Log out"}
          >
            <FiLogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
