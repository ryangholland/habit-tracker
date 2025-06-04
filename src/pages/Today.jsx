import { useHabits } from "../hooks/useHabits";
import { useToday } from "../hooks/useToday";
import { useProgress } from "../hooks/useProgress";

import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";
import ProgressBar from "../components/ProgressBar";

function Today() {
  const { habits } = useHabits();
  const { formatted } = useToday();
  const { progress } = useProgress(habits);

  return (
    <>
      <h2 className="text-2xl">{formatted}</h2>
      <p className="italic">
        The journey of a thousand miles begins with a single step.
      </p>
      {habits.length > 0 && <HabitList />}
      {habits.length === 0 && (
        <p className="text-gray-500">
          No habits added yet. Start by adding a habit below.
        </p>
      )}
      <AddHabitForm />
      {habits.length > 0 && <ProgressBar progress={progress} />}
    </>
  );
}

export default Today;
