import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";
import ProgressBar from "../components/ProgressBar";

function Today({ habits, setHabits }) {
  return (
    <>
      <h2 className="text-lg">May 23, 2025</h2>
      <p className="italic">
        The journey of a thousand miles begins with a single step.
      </p>
      <HabitList habits={habits} setHabits={setHabits} />
      <AddHabitForm habits={habits} setHabits={setHabits} />
      <ProgressBar progress={50} />
    </>
  );
}

export default Today;
