import { useHabits } from "../hooks/useHabits";
import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { Switch } from "@headlessui/react";

function Settings() {
  const { habits } = useHabits();
  const { darkMode, setDarkMode } = useContext(SettingsContext);

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
          {/* TODO: Sort Dropdown */}
          {/* TODO: Motivational Quote Toggle */}
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
