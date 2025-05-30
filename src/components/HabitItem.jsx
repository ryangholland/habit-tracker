import { Checkbox } from "@headlessui/react";
import { FaCog, FaTrash } from "react-icons/fa"; // Import icons

function HabitItem({ habit, toggleHabitStatus }) {
  const { id, name, completedToday } = habit;

  return (
    <div
      className="group flex items-center justify-between space-x-2 gap-2 p-2 rounded-lg border border-gray-700 bg-gray-800 
        hover:bg-gray-700 hover:border-gray-500  transition duration-200 md:text-xl"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          checked={completedToday}
          onChange={() => toggleHabitStatus(id)}
          className={`group block size-6 rounded border border-gray-400 bg-gray-800 
            data-checked:bg-gray-400 focus:outline-none hover:cursor-pointer`}
        >
          {/* Checkmark icon */}
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
        <span className="px-1 text-white">{name}</span>
      </div>
      {/* Icons for Edit and Delete */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition duration-200">
        <button
          className="text-gray-400 hover:text-gray-200 hover:cursor-pointer"
          aria-label="Edit Habit"
        >
          <FaCog />
        </button>
        <button
          className="text-gray-400 hover:text-red-500 hover:cursor-pointer"
          aria-label="Delete Habit"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default HabitItem;
