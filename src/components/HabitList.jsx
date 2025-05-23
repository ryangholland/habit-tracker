import HabitItem from "./HabitItem";

function HabitList() {
  return (
    <div className="py-4 flex flex-col gap-4">
      <HabitItem habitName="Drink Water" />
      <HabitItem habitName="Drink Water" />
      <HabitItem habitName="Drink Water" />
    </div>
  );
}

export default HabitList;
