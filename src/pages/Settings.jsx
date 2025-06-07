import { useHabits } from "../hooks/useHabits";

function Settings() {
  const { habits } = useHabits();

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">General Settings</h2>
        <div className="space-y-4">
          {/* TODO: Dark Mode Toggle */}
          {/* TODO: Sort Dropdown */}
          {/* TODO: Motivational Quote Toggle */}
          {/* TODO: Delete All History Button */}
          {/* TODO: Reset All Data Button */}
        </div>
      </section>

      {/* Habit Settings */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Habit Settings</h2>
        <div className="space-y-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="rounded-md border border-gray-700 bg-gray-800 p-4"
            >
              <p className="text-white">{habit.name}</p>
              {/* TODO: Expandable settings */}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Settings;
