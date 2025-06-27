import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { supabase } from "../../supabaseClient";
import HabitNameEditor from "./HabitNameEditor";
import ActiveDaySelector from "./ActiveDaySelector";
import HabitSettingsItem from "./HabitSettingsItem";

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
  const { isGuest } = useContext(AuthContext);
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [everyDayEnabled, setEveryDayEnabled] = useState({});
  const [expandedHabitId, setExpandedHabitId] = useState(initiallyExpandedId);
  const habitRefs = useRef({});

  function saveToLocalStorage(updatedHabits) {
    if (isGuest) {
      localStorage.setItem("guest_habits", JSON.stringify(updatedHabits));
    }
  }

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
