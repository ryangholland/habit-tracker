import { useHabits } from "../hooks/useHabits";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import {
  Switch,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { FaChevronDown, FaCheck } from "react-icons/fa";

function Settings() {
  const { habits } = useHabits();
  const { darkMode, setDarkMode } = useContext(SettingsContext);
  const { sortOrder, setSortOrder } = useContext(SettingsContext);
  const { showQuote, setShowQuote } = useContext(SettingsContext);

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name (A–Z)" },
    { value: "name-desc", label: "Name (Z–A)" },
    { value: "incomplete-first", label: "Incomplete First" },
    { value: "complete-first", label: "Complete First" },
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
        </div>
      </section>

      {/* Habit Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Habit Settings
        </h2>
        <div className="space-y-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
            >
              <p className="text-black dark:text-white">{habit.name}</p>
              {/* TODO: Expandable settings */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Settings;
