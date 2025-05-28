import HabitItem from "./HabitItem";

function HabitList({ habits, setHabits }) {
  const toggleHabitStatus = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completedToday: !habit.completedToday }
          : habit
      )
    );
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
