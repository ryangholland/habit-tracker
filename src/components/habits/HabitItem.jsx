import { useNavigate } from "react-router-dom";
import { Checkbox } from "@headlessui/react";
import { FaCog, FaTrash } from "react-icons/fa";
import IconButton from "../common/IconButton";
import { useDeleteDialog } from "../../hooks/useDeleteDialog";

function HabitItem({ habit, toggleHabitStatus, isoDate = null }) {
  const { id, name, history } = habit;
  const { openDeleteDialog } = useDeleteDialog();
  const navigate = useNavigate();

  // Determine which date we're showing (default: today)
  const dateToUse = isoDate || new Date().toISOString().slice(0, 10);
  const isChecked = history?.[dateToUse] === true;

  const handleItemClick = (e) => {
    if (e.target.closest(".icon-container")) return;
    toggleHabitStatus(id, dateToUse);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleHabitStatus(id, dateToUse);
    }
  };

  return (
    <div
      onClick={handleItemClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      className="group flex items-center justify-between space-x-2 gap-2 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
      hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition duration-200 md:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          aria-checked={isChecked}
          tabIndex={-1}
          title={isChecked ? "Mark as incomplete" : "Mark as complete"}
          className={`group block size-6 rounded border 
            border-gray-400 dark:border-gray-600
            bg-white dark:bg-gray-800
            data-checked:bg-gray-800 dark:data-checked:bg-gray-400
            focus:outline-none hover:cursor-pointer 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-white`}
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
        <span
          className={`px-1 text-black dark:text-white ${
            isChecked ? "line-through text-gray-500 dark:text-gray-400" : ""
          }`}
        >
          {name}
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2 opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition duration-200">
        <IconButton
          label="Edit Habit"
          icon={FaCog}
          className="hover:text-gray-200"
          onClick={() => navigate(`/settings?habitId=${id}`)}
        />
        <IconButton
          label="Delete Habit"
          icon={FaTrash}
          className="hover:text-red-400"
          onClick={() => openDeleteDialog(habit)}
        />
      </div>
    </div>
  );
}

export default HabitItem;
