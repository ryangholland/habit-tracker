import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import HabitSettingsItem from "./HabitSettingsItem";

function HabitSettings({
  habits,
  setHabits,
  openDeleteDialog,
  setHabitToClear,
  initiallyExpandedId,
}) {
  const { isGuest } = useContext(AuthContext);
  const expandedHabitId = useState(initiallyExpandedId)[0];
  const habitRefs = useRef({});

  function saveToLocalStorage(updatedHabits) {
    if (isGuest) {
      localStorage.setItem("guest_habits", JSON.stringify(updatedHabits));
    }
  }

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
        {habits.map((habit) => (
          <HabitSettingsItem
            key={habit.id}
            ref={(el) => (habitRefs.current[habit.id] = el)}
            habit={habit}
            isGuest={isGuest}
            habits={habits}
            setHabits={setHabits}
            saveToLocalStorage={saveToLocalStorage}
            openDeleteDialog={openDeleteDialog}
            setHabitToClear={setHabitToClear}
            defaultOpen={expandedHabitId === habit.id}
          />
        ))}
      </div>
    </section>
  );
}

export default HabitSettings;
