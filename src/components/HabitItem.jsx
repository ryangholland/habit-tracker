import { Checkbox } from "@headlessui/react";
import { FaCog, FaTrash } from "react-icons/fa";

function HabitItem({ habit, toggleHabitStatus }) {
  const { id, name, completedToday } = habit;

  const handleItemClick = (e) => {
    // Prevent toggling when clicking on the icons or their container
    if (e.target.closest(".icon-container")) return;
    toggleHabitStatus(id);
  };

  return (
    <div
      onClick={handleItemClick}
      className="group flex items-center justify-between space-x-2 gap-2 p-2 rounded-lg border border-gray-700 bg-gray-800 
        hover:bg-gray-700 hover:border-gray-500  transition duration-200 md:text-lg"
    >
      <div className="flex items-center gap-2">
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={completedToday}
            onChange={() => toggleHabitStatus(id)}
            className={`group block size-6 rounded border border-gray-400 bg-gray-800 
            data-checked:bg-gray-400 focus:outline-none hover:cursor-pointer`}
          >
            <svg
              className="h-4 w-4 text-gray-400 opacity-0 group-data-checked:opacity-100 group-data-checked:text-white"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3 8L6 11L11 3.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Checkbox>
        </div>
        <span
          className={`px-1 text-white ${
            completedToday ? "line-through text-gray-400" : ""
          }`}
        >
          {name}
        </span>
      </div>
      {/* Icons for Edit and Delete */}
      <div className="hidden md:flex items-center gap-2 opacity-0 md:group-hover:opacity-100 transition duration-200">
        <div className="icon-container p-1 ">
          <button
            className="text-gray-400 hover:text-gray-200 hover:cursor-pointer"
            aria-label="Edit Habit"
          >
            <FaCog />
          </button>
        </div>
        <div className="icon-container p-1 ">
          <button
            className="text-gray-400 hover:text-red-500 hover:cursor-pointer"
            aria-label="Delete Habit"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitItem;
