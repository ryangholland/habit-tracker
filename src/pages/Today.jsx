import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";
import ProgressBar from "../components/ProgressBar";

function Today({ habits, setHabits }) {
  const completedHabits = habits.filter((habit) => habit.completedToday).length;
  const totalHabits = habits.length;
  const progress =
    totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  return (
    <>
      <h2 className="text-lg">May 23, 2025</h2>
      <p className="italic">
        The journey of a thousand miles begins with a single step.
      </p>
      {habits.length > 0 && <HabitList habits={habits} setHabits={setHabits} />}
      <AddHabitForm habits={habits} setHabits={setHabits} />
      {habits.length > 0 && <ProgressBar progress={progress} />}
    </>
  );
}

export default Today;
