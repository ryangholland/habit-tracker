import { supabase } from "../supabaseClient";
import { toggleHabit } from "../utils/habitUtils";

export function useToggleHabitStatus({ habits, setHabits, isGuest }) {
  return async function toggleHabitStatus(id, isoDate) {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const current = habit.history?.[isoDate] === true;
    const newCompleted = !current;

    if (isGuest) {
      const updated = toggleHabit(habits, id, isoDate);
      setHabits(updated);
      localStorage.setItem("guest_habits", JSON.stringify(updated));
      return;
    }

    // Check if a history entry already exists
    const { data: existing, error: fetchError } = await supabase
      .from("habit_history")
      .select("id")
      .eq("habit_id", id)
      .eq("date", isoDate)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Failed to check history:", fetchError.message);
      return;
    }

    if (existing) {
      // Update
      const { error } = await supabase
        .from("habit_history")
        .update({ completed: newCompleted })
        .eq("id", existing.id);
      if (error) {
        console.error("Failed to update habit history:", error.message);
        return;
      }
    } else {
      // Insert
      const { error } = await supabase.from("habit_history").insert({
        habit_id: id,
        date: isoDate,
        completed: newCompleted,
      });
      if (error) {
        console.error("Failed to insert habit history:", error.message);
        return;
      }
    }

    // Update local state
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: newCompleted,
              history: {
                ...h.history,
                [isoDate]: newCompleted,
              },
            }
          : h
      )
    );
  };
}
