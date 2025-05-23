import HabitList from "../components/HabitList";

function Today() {
  return (
    <div className="bg-gray-800 rounded-xl p-4 mt-2 mx-4 md:p-6 flex flex-col gap-2">
      <h2 className="text-lg">May 23, 2025</h2>
      <p className="italic">
        The journey of a thousand miles begins with a single step.
      </p>
      <HabitList />
      <p>AddHabitForm</p>
      <p>ProgressBar</p>
    </div>
  );
}

export default Today;
