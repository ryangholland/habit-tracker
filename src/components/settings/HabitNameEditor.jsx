import { useState } from "react";
import { supabase } from "../../supabaseClient";

function HabitNameEditor({ habit, isGuest, onRename }) {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(habit.name);

  const handleSave = async () => {
    const newName = editedName.trim();
    if (!newName || newName === habit.name) {
      setEditing(false);
      return;
    }

    onRename(habit.id, newName);
    setEditing(false);

    if (!isGuest) {
      try {
        await supabase
          .from("habits")
          .update({ name: newName })
          .eq("id", habit.id);
      } catch (err) {
        console.error("Failed to update name:", err);
      }
    }
  };

  if (editing) {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") setEditing(false);
          }}
          className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white text-sm"
        />
        <button
          onClick={handleSave}
          className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={() => setEditing(false)}
          className="text-sm px-3 py-1 bg-gray-300 hover:bg-gray-400 text-black rounded-md cursor-pointer"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <span className="text-sm text-gray-800 dark:text-gray-300">
        {habit.name}
      </span>
      <button
        onClick={() => setEditing(true)}
        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        aria-label="Edit Habit Name"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M3 5a2 2 0 012-2h6a1 1 0 110 2H5a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1v-6a1 1 0 112 0v6a3 3 0 01-3 3H5a3 3 0 01-3-3V5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default HabitNameEditor;
