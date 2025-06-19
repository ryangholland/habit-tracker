import {
  Popover,
  PopoverPanel,
  PopoverButton,
  Transition,
} from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { useContext, Fragment } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 text-black dark:text-white border-b border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-4xl">Daily Habit Tracker</h1>

        <Popover className="relative">
          <PopoverButton className="focus:outline-none cursor-pointer">
            <FaUser className="text-xl md:text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition" />
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <PopoverPanel className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  Hi, <span className="font-semibold">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
      <hr />
    </header>
  );
}

export default Header;
