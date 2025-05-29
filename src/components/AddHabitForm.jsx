import { useState } from "react";
import { useHabits } from "../hooks/useHabits";
import { useToday } from "../hooks/useToday";
import { createNewHabit } from "../utils/habitUtils";

import { Input } from "@headlessui/react";

function AddHabitForm() {
  const { habits, setHabits } = useHabits();
  const { isoDate } = useToday();
  const [inputValue, setInputValue] = useState("");

  function addHabit(name) {
    if (!name.trim()) return;
    const newHabit = createNewHabit(name, isoDate);
    setHabits([...habits, newHabit]);
    setInputValue("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    addHabit(inputValue);
  }

  return (
    <form
      className="flex bg-gray-800 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <Input
        name="habit_name"
        type="text"
        placeholder="Add a habit"
        className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}

export default AddHabitForm;
