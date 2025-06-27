import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import HabitNameEditor from "./HabitNameEditor";
import ActiveDaySelector from "./ActiveDaySelector";

function HabitSettingsItem({
  habit,
  isGuest,
  habits,
  setHabits,
  saveToLocalStorage,
  openDeleteDialog,
  setHabitToClear,
  defaultOpen = false,
}) {
  return (
    <div className="rounded-md shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <Disclosure defaultOpen={defaultOpen}>
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
                  <HabitNameEditor
                    habit={habit}
                    isGuest={isGuest}
                    onRename={(id, newName) => {
                      const updated = habits.map((h) =>
                        h.id === id ? { ...h, name: newName } : h
                      );
                      setHabits(updated);
                      saveToLocalStorage(updated);
                    }}
                  />
                </div>
              </div>

              {/* Active Days */}
              <ActiveDaySelector
                habit={habit}
                isGuest={isGuest}
                habits={habits}
                setHabits={setHabits}
                saveToLocalStorage={saveToLocalStorage}
              />

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
}

export default HabitSettingsItem;
