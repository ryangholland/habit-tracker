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
    console.log(`Habit ${id} status toggled`);
  };

  return (
    <div className="py-4 flex flex-col gap-4">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habitId={habit.id}
          habitName={habit.name}
          habitCompleted={habit.completedToday}
          toggleHabitStatus={toggleHabitStatus}
        />
      ))}
    </div>
  );
}

export default HabitList;
