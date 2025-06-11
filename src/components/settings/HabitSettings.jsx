import { useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

// Helper
const isEveryDay = (activeDays = []) =>
  activeDays.length === 7 && [0, 1, 2, 3, 4, 5, 6].every((d) => activeDays.includes(d));

function HabitSettings({ habits, setHabits, openDeleteDialog, setHabitToClear }) {
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [everyDayEnabled, setEveryDayEnabled] = useState({});

  const daysOfWeek = [
    { label: "Sun", index: 0 },
    { label: "Mon", index: 1 },
    { label: "Tue", index: 2 },
    { label: "Wed", index: 3 },
    { label: "Thu", index: 4 },
    { label: "Fri", index: 5 },
    { label: "Sat", index: 6 },
  ];

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
              className="rounded-md shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <DisclosureButton className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm sm:text-base font-medium text-black dark:text-white border-b border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-t-md cursor-pointer">
                      <span>{habit.name}</span>
                      <FaChevronDown
                        className={`h-4 w-4 transform transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>

                    <DisclosurePanel className="px-4 py-4 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded-b-md border-t border-gray-300 dark:border-gray-600 space-y-4">
                      {/* Habit Name Editing */}
                      {editingHabitId === habit.id ? (
                        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white w-full sm:w-auto"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const newName = editedName.trim();
                                if (newName) {
                                  setHabits((prev) =>
                                    prev.map((h) =>
                                      h.id === habit.id ? { ...h, name: newName } : h
                                    )
                                  );
                                }
                                setEditingHabitId(null);
                                setEditedName("");
                              }}
                              className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditingHabitId(null);
                                setEditedName("");
                              }}
                              className="px-3 py-1 rounded-md bg-gray-400 text-white text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Habit Name:{" "}
                            <span className="font-semibold">{habit.name}</span>
                          </p>
                          <button
                            onClick={() => {
                              setEditingHabitId(habit.id);
                              setEditedName(habit.name);
                            }}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      )}

                      {/* Every Day Checkbox */}
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
                                    ? { ...h, activeDays: [0, 1, 2, 3, 4, 5, 6] }
                                    : h
                                )
                              );
                            }
                          }}
                          className="w-4 h-4"
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

                      {/* Day Buttons */}
                      <div className="flex gap-2 flex-wrap">
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
                                            ? h.activeDays.filter((d) => d !== index)
                                            : [...h.activeDays, index],
                                        }
                                      : h
                                  )
                                );
                                // Uncheck "Every Day" if user changes any day
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
                              } ${isLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Clear/Delete Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-4">
                        <button
                          onClick={() => setHabitToClear(habit)}
                          className="px-3 py-1 rounded-md bg-yellow-300 hover:bg-yellow-400 text-black border border-yellow-400 dark:border-yellow-500 dark:text-black text-sm cursor-pointer"
                        >
                          Clear History
                        </button>
                        <button
                          onClick={() => openDeleteDialog(habit)}
                          className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white border border-red-600 text-sm cursor-pointer"
                        >
                          Delete Habit
                        </button>
                      </div>
                    </DisclosurePanel>
                  </>
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
