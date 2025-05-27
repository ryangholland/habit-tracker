import HabitItem from "./HabitItem";

function HabitList({ habits }) {
  return (
    <div className="py-4 flex flex-col gap-4">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habitName={habit.name} />
      ))}
    </div>
  );
}

export default HabitList;
