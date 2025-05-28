import HabitItem from "./HabitItem";
import { toggleHabit } from "../utils/habitUtils";

function HabitList({ habits, setHabits }) {
  const toggleHabitStatus = (id) => {
    setHabits((prevHabits) => toggleHabit(prevHabits, id));
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          toggleHabitStatus={toggleHabitStatus}
        />
      ))}
    </div>
  );
}

export default HabitList;
