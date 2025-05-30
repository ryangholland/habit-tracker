import { Checkbox } from "@headlessui/react";

function HabitItem({ habit, toggleHabitStatus }) {
  const { id, name, completedToday } = habit;

  return (
    <div className="flex items-center space-x-2 gap-2
    p-2 rounded-lg border border-gray-700 bg-gray-800 
        hover:bg-gray-700 hover:border-gray-500 hover:cursor-pointer transition duration-200">
      <Checkbox
        checked={completedToday}
        onChange={() => toggleHabitStatus(id)}
        className={`group block size-6  rounded border border-gray-400 bg-gray-800 
          data-checked:bg-gray-400 focus:outline-none`}
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
      <span
        className={`text-lg ${
          completedToday ? "line-through text-gray-400" : "text-white"
        }`}
      >
        {name}
      </span>
    </div>
  );
}

export default HabitItem;
