import { useContext, useState } from "react";
import { useHabits } from "../../hooks/useHabits";
import { useToday } from "../../hooks/useToday";
import { supabase } from "../../supabaseClient";
import { AuthContext } from "../../context/AuthContext";
import { Input } from "@headlessui/react";
import { createNewHabit } from "../../utils/habitUtils";

function AddHabitForm() {
  const { user, isGuest } = useContext(AuthContext);
  const { habits, setHabits } = useHabits();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const { isoDate } = useToday();

  async function addHabit(name) {
    if (!name.trim()) return;

    if (habits.length >= 20) {
      setError("You can only track up to 20 habits.");
      return;
    }

    // GUEST MODE
    if (isGuest) {
      const newHabit = createNewHabit(name, isoDate);
      const updated = [...habits, newHabit];
      setHabits(updated);
      localStorage.setItem("guest_habits", JSON.stringify(updated));
      setInputValue("");
      return;
    }

    if (!user) return;

    // SUPABASE MODE — Optimistic UI first
    const tempId = crypto.randomUUID();
    const optimisticHabit = {
      id: tempId,
      name,
      activeDays: [0, 1, 2, 3, 4, 5, 6],
      history: { [isoDate]: false },
      completedToday: false,
    };

    setHabits([...habits, optimisticHabit]);
    setInputValue("");
    setError("");

    try {
      const { data: habit, error: habitError } = await supabase
        .from("habits")
        .insert({
          user_id: user.id,
          name,
          active_days: [0, 1, 2, 3, 4, 5, 6],
        })
        .select()
        .single();

      if (habitError) {
        console.error("Error creating habit:", habitError.message);
        return;
      }

      await supabase.from("habit_history").insert({
        habit_id: habit.id,
        date: isoDate,
        completed: false,
      });

      // Replace optimistic habit with real one
      setHabits((prev) =>
        prev.map((h) =>
          h.id === tempId ? { ...h, id: habit.id } : h
        )
      );
    } catch (err) {
      console.error("Failed to create habit:", err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (habits.length >= 20) return;
    addHabit(inputValue);
  }

  return (
    <form
      className="flex bg-gray-100 dark:bg-gray-800 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      {error && (
        <p className="text-red-600 text-sm font-medium px-4 py-2">{error}</p>
      )}
      <Input
        name="habit_name"
        type="text"
        placeholder={
          habits.length >= 20 ? "Habit limit reached (20/20)" : "Add a habit"
        }
        className="w-full px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={habits.length >= 20}
      />
    </form>
  );
}

export default AddHabitForm;
