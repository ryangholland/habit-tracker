import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import HabitItem from "./HabitItem";

function HabitList({ habits, onToggle }) {
  const { sortOrder } = useContext(SettingsContext);

  const sortedHabits = [...habits].sort((a, b) => {
    switch (sortOrder) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "incomplete-first":
        return a.completedToday - b.completedToday;
      case "complete-first":
        return b.completedToday - a.completedToday;
      default:
        return 0;
    }
  });

  return (
    <div className="mb-2 md:mb-4 flex flex-col gap-4">
      {sortedHabits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} toggleHabitStatus={onToggle} />
      ))}
    </div>
  );
}

export default HabitList;
