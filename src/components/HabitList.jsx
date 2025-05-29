import { useHabits } from "../hooks/useHabits";
import { toggleHabit } from "../utils/habitUtils";
import { useToday } from "../hooks/useToday";

import HabitItem from "./HabitItem";

function HabitList() {
  const { habits, setHabits } = useHabits();
  const { isoDate } = useToday();

  const toggleHabitStatus = (id) => {
    setHabits((prevHabits) => toggleHabit(prevHabits, id, isoDate));
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
