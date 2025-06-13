import { useState, useEffect, useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const isEveryDay = (activeDays = []) =>
  activeDays.length === 7 &&
  [0, 1, 2, 3, 4, 5, 6].every((d) => activeDays.includes(d));

function HabitSettings({
  habits,
  setHabits,
  openDeleteDialog,
  setHabitToClear,
  initiallyExpandedId,
}) {
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [everyDayEnabled, setEveryDayEnabled] = useState({});
  const [expandedHabitId, setExpandedHabitId] = useState(initiallyExpandedId);
  const habitRefs = useRef({});

  const daysOfWeek = [
    { label: "Sun", index: 0 },
    { label: "Mon", index: 1 },
    { label: "Tue", index: 2 },
    { label: "Wed", index: 3 },
    { label: "Thu", index: 4 },
    { label: "Fri", index: 5 },
    { label: "Sat", index: 6 },
  ];

  useEffect(() => {
    if (initiallyExpandedId && habitRefs.current[initiallyExpandedId]) {
      habitRefs.current[initiallyExpandedId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [initiallyExpandedId]);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Habit Settings
      </h2>
      <div className="space-y-4">
        {habits.map((habit) => {
          const checkboxChecked =
            everyDayEnabled[habit.id] ?? isEveryDay(habit.activeDays);
          const isLocked = checkboxChecked;

          return (
            <div
              key={habit.id}
              ref={(el) => (habitRefs.current[habit.id] = el)}
              className="rounded-md shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <Disclosure defaultOpen={expandedHabitId === habit.id}>
                {({ open }) => (
                  <div>
                    <DisclosureButton className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm sm:text-base font-medium text-black dark:text-white border-b border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-t-md cursor-pointer">
                      <span>{habit.name}</span>
                      <FaChevronDown
                        className={`h-4 w-4 transform transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>

                    <DisclosurePanel className="divide-y divide-gray-200 dark:divide-gray-700 px-4 py-4 bg-white dark:bg-gray-800 rounded-b-md border-t border-gray-300 dark:border-gray-600">
                      {/* Habit Name */}
                      <div className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <label className="block font-medium text-gray-900 dark:text-white text-sm mb-1">
                            Habit Name
                          </label>
                          {editingHabitId === habit.id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    const newName = editedName.trim();
                                    if (newName) {
                                      setHabits((prev) =>
                                        prev.map((h) =>
                                          h.id === habit.id
                                            ? { ...h, name: newName }
                                            : h
                                        )
                                      );
                                    }
                                    setEditingHabitId(null);
                                    setEditedName("");
                                  } else if (e.key === "Escape") {
                                    setEditingHabitId(null);
                                    setEditedName("");
                                  }
                                }}
                                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white text-sm"
                              />
                              <button
                                onClick={() => {
                                  const newName = editedName.trim();
                                  if (newName) {
                                    setHabits((prev) =>
                                      prev.map((h) =>
                                        h.id === habit.id
                                          ? { ...h, name: newName }
                                          : h
                                      )
                                    );
                                  }
                                  setEditingHabitId(null);
                                  setEditedName("");
                                }}
                                className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md cursor-pointer"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingHabitId(null);
                                  setEditedName("");
                                }}
                                className="text-sm px-3 py-1 bg-gray-300 hover:bg-gray-400 text-black rounded-md cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <span className="text-sm text-gray-800 dark:text-gray-300">
                                {habit.name}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingHabitId(habit.id);
                                  setEditedName(habit.name);
                                }}
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
                          )}
                        </div>
                      </div>

                      {/* Active Days */}
                      <div className="py-4 space-y-2">
                        <label className="block font-medium text-gray-900 dark:text-white text-sm">
                          Active Days
                        </label>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checkboxChecked}
                            onChange={() => {
                              const enable = !checkboxChecked;
                              setEveryDayEnabled((prev) => ({
                                ...prev,
                                [habit.id]: enable,
                              }));
                              if (enable) {
                                setHabits((prev) =>
                                  prev.map((h) =>
                                    h.id === habit.id
                                      ? {
                                          ...h,
                                          activeDays: [0, 1, 2, 3, 4, 5, 6],
                                        }
                                      : h
                                  )
                                );
                              }
                            }}
                            className="w-4 h-4 cursor-pointer"
                            id={`everyday-${habit.id}`}
                          />
                          <label
                            htmlFor={`everyday-${habit.id}`}
                            className="text-sm text-black dark:text-white cursor-pointer"
                            title="Check to enable all days. Uncheck to edit days manually."
                          >
                            Every Day
                          </label>
                        </div>

                        <div className="flex gap-2 flex-wrap mt-2">
                          {daysOfWeek.map(({ label, index }) => {
                            const isActive = habit.activeDays?.includes(index);
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  setHabits((prevHabits) =>
                                    prevHabits.map((h) =>
                                      h.id === habit.id
                                        ? {
                                            ...h,
                                            activeDays: isActive
                                              ? h.activeDays.filter(
                                                  (d) => d !== index
                                                )
                                              : [...h.activeDays, index],
                                          }
                                        : h
                                    )
                                  );
                                  setEveryDayEnabled((prev) => ({
                                    ...prev,
                                    [habit.id]: false,
                                  }));
                                }}
                                disabled={isLocked}
                                className={`px-2 py-1 rounded-md text-sm border ${
                                  isActive
                                    ? "bg-blue-600 text-white border-blue-700"
                                    : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-gray-400 dark:border-gray-600"
                                } ${
                                  isLocked
                                    ? "opacity-60 cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Clear/Delete */}
                      <div className="py-4 flex flex-wrap gap-3">
                        <button
                          onClick={() => setHabitToClear(habit)}
                          className="text-sm px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black border border-yellow-400 dark:border-yellow-500 rounded-md cursor-pointer"
                        >
                          Clear History
                        </button>
                        <button
                          onClick={() => openDeleteDialog(habit)}
                          className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white border border-red-600 rounded-md cursor-pointer"
                        >
                          Delete Habit
                        </button>
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default HabitSettings;
