import { Popover, PopoverPanel, PopoverButton } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white border-b border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl">Daily Habit Tracker</h1>

        <Popover className="relative">
          <PopoverButton className="focus:outline-none">
            <FaUser className="text-xl md:text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer" />
          </PopoverButton>

          <PopoverPanel className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                Hi, <span className="font-semibold">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
      <hr />
    </header>
  );
}

export default Header;
