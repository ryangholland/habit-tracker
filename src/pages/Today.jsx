import HabitList from "../components/HabitList";
import AddHabitForm from "../components/AddHabitForm";
import ProgressBar from "../components/ProgressBar";

function Today() {
  return (
    <>
      <h2 className="text-lg">May 23, 2025</h2>
      <p className="italic">
        The journey of a thousand miles begins with a single step.
      </p>
      <HabitList />
      <AddHabitForm />
      <ProgressBar progress={50} />
    </>
  );
}

export default Today;
