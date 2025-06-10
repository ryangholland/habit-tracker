import { useHabits } from "../hooks/useHabits";
import { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";
import {
  Switch,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

function Settings() {
  const { habits, setHabits } = useHabits();
  const { openDeleteDialog } = useDeleteDialog();
  const { darkMode, setDarkMode } = useContext(SettingsContext);
  const { sortOrder, setSortOrder } = useContext(SettingsContext);
  const { showQuote, setShowQuote } = useContext(SettingsContext);
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [habitToClear, setHabitToClear] = useState(null);

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name (A–Z)" },
    { value: "name-desc", label: "Name (Z–A)" },
    { value: "incomplete-first", label: "Incomplete First" },
    { value: "complete-first", label: "Complete First" },
  ];

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
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          General Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-white">Dark Mode</span>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? "bg-blue-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  darkMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          {/* TODO: Motivational Quote Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-white">
              Show Motivational Quote
            </span>
            <Switch
              checked={showQuote}
              onChange={setShowQuote}
              className={`${
                showQuote ? "bg-blue-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  showQuote ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          {/* TODO: Sort Dropdown */}
          <div className="space-y-1">
            <label className="text-gray-700 dark:text-white block">
              Habit Sort Order
            </label>
            <Listbox value={sortOrder} onChange={setSortOrder}>
              <div className="relative w-64">
                <ListboxButton className="relative w-full cursor-pointer rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 py-2 pl-3 pr-10 text-left text-black dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm">
                  <span className="block truncate">
                    {sortOptions.find((opt) => opt.value === sortOrder)?.label}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <FaChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortOptions.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-blue-100 dark:bg-gray-700 text-black dark:text-white"
                            : "text-black dark:text-white"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.label}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                              <FaCheck className="h-4 w-4" />
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* TODO: Delete All History Button */}
          {/* TODO: Reset All Data Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => setShowClearHistoryDialog(true)}
              className="px-4 py-2 rounded-md bg-yellow-300 hover:bg-yellow-400 text-black dark:text-black border border-yellow-400 dark:border-yellow-500 cursor-pointer"
            >
              Clear All History
            </button>
            <button
              onClick={() => setShowDeleteAllDialog(true)}
              className="px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 text-white dark:text-white border border-red-500 cursor-pointer"
            >
              Delete All Data
            </button>
          </div>
        </div>
      </section>

      {/* Habit Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Habit Settings
        </h2>
        <div className="space-y-4">
          {habits.map((habit) => (
            <Disclosure key={habit.id}>
              {({ open }) => (
                <div className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <DisclosureButton className="w-full flex justify-between items-center px-4 py-3 text-left text-black dark:text-white font-medium cursor-pointer">
                    {habit.name}
                    <FaChevronDown
                      className={`h-4 w-4 transform transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pb-4 pt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
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
                        className="px-3 py-1 rounded-md bg-yellow-300 hover:bg-yellow-400 text-black border border-yellow-400 dark:border-yellow-500 dark:text-black text-sm"
                      >
                        Clear History
                      </button>
                      <button
                        onClick={() => openDeleteDialog(habit)}
                        className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white border border-red-600 text-sm"
                      >
                        Delete Habit
                      </button>
                    </div>
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
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
