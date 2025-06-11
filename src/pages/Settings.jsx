import { useHabits } from "../hooks/useHabits";
import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import GeneralSettings from "../components/settings/GeneralSettings";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

function Settings() {
  const { habits, setHabits } = useHabits();
  const { openDeleteDialog } = useDeleteDialog();

  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [habitToClear, setHabitToClear] = useState(null);
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editedName, setEditedName] = useState("");

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
    <div className="space-y-8">
      {/* General Settings */}
      <GeneralSettings
        onClearHistoryClick={() => setShowClearHistoryDialog(true)}
        onDeleteAllClick={() => setShowDeleteAllDialog(true)}
      />

      {/* Habit Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Habit Settings
        </h2>
        <div className="space-y-4">
          {habits.map((habit) => (
            <div className="rounded-md shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              <Disclosure key={habit.id}>
                {({ open }) => (
                  <div className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <DisclosureButton className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm sm:text-base font-medium text-black dark:text-white border-b border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-t-md cursor-pointer">
                      <span>{habit.name}</span>
                      <FaChevronDown
                        className={`h-4 w-4 transform transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 py-4 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded-b-md border-t border-gray-300 dark:border-gray-600 space-y-4">
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
                                      h.id === habit.id
                                        ? { ...h, name: newName }
                                        : h
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

                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        Active Days
                      </label>

                      {/* "Every Day" Toggle */}
                      <button
                        onClick={() => {
                          const allDays = [0, 1, 2, 3, 4, 5, 6];
                          const hasAllDays =
                            habit.activeDays?.length === 7 &&
                            allDays.every((d) => habit.activeDays.includes(d));

                          setHabits((prev) =>
                            prev.map((h) =>
                              h.id === habit.id
                                ? {
                                    ...h,
                                    activeDays: hasAllDays ? [] : allDays,
                                  }
                                : h
                            )
                          );
                        }}
                        className={`text-sm px-3 py-1 rounded-md border cursor-pointer ${
                          habit.activeDays?.length === 7
                            ? "bg-green-600 text-white border-green-700"
                            : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-gray-400 dark:border-gray-600"
                        }`}
                      >
                        Every Day
                      </button>

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
                                            ? h.activeDays.filter(
                                                (d) => d !== index
                                              )
                                            : [...h.activeDays, index],
                                        }
                                      : h
                                  )
                                );
                              }}
                              className={`px-2 py-1 rounded-md text-sm border cursor-pointer ${
                                isActive
                                  ? "bg-blue-600 text-white border-blue-700"
                                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white border-gray-400 dark:border-gray-600"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>

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
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </section>

      {/* Dialogs */}
      <ConfirmationDialog
        isOpen={showClearHistoryDialog}
        onClose={() => setShowClearHistoryDialog(false)}
        onConfirm={() => {
          const cleared = habits.map((h) => ({
            ...h,
            completedToday: false,
            history: {},
          }));
          setHabits(cleared);
          setShowClearHistoryDialog(false);
        }}
        title="Clear All Habit History?"
        message="This will erase all history data for every habit. Your habits will remain, but all past completions will be lost."
        confirmLabel="Clear History"
      />

      <ConfirmationDialog
        isOpen={showDeleteAllDialog}
        onClose={() => setShowDeleteAllDialog(false)}
        onConfirm={() => {
          setHabits([]);
          setShowDeleteAllDialog(false);
        }}
        title="Delete All Habits?"
        message="This will delete all your habits and their history. This action cannot be undone."
        confirmLabel="Delete Everything"
      />

      <ConfirmationDialog
        isOpen={habitToClear !== null}
        onClose={() => setHabitToClear(null)}
        onConfirm={() => {
          if (habitToClear) {
            setHabits((prev) =>
              prev.map((h) =>
                h.id === habitToClear.id
                  ? { ...h, history: {}, completedToday: false }
                  : h
              )
            );
          }
          setHabitToClear(null);
        }}
        title={`Clear History for "${habitToClear?.name}"?`}
        message="This will erase all progress and streaks for this habit, but the habit itself will remain."
        confirmLabel="Clear History"
      />
    </div>
  );
}

export default Settings;
