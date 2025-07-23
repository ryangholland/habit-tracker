import { supabase } from "../supabaseClient";

export function useToggleHabitStatus({ habits, setHabits, isGuest }) {
  return async function toggleHabitStatus(
    id,
    isoDate = new Date().toISOString().slice(0, 10)
  ) {
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    const current = habit.history?.[isoDate] === true;
    const newCompleted = !current;

    // Optimistically update state
    const updatedHabits = habits.map((h) => {
      if (h.id !== id) return h;

      const updatedHistory = {
        ...h.history,
        [isoDate]: newCompleted,
      };

      const todayISO = new Date().toISOString().slice(0, 10);

      return {
        ...h,
        history: updatedHistory,
        completedToday: isoDate === todayISO ? newCompleted : h.completedToday,
      };
    });

    setHabits(updatedHabits);
    if (isGuest) {
      localStorage.setItem("guest_habits", JSON.stringify(updatedHabits));
      return;
    }

    // Fire-and-forget Supabase call
    try {
      const { data: existing, error: fetchError } = await supabase
        .from("habit_history")
        .select("id")
        .eq("habit_id", id)
        .eq("date", isoDate)
        .maybeSingle();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Failed to check history:", fetchError.message);
        return;
      }

      if (existing) {
        await supabase
          .from("habit_history")
          .update({ completed: newCompleted })
          .eq("id", existing.id);
      } else {
        await supabase.from("habit_history").insert({
          habit_id: id,
          date: isoDate,
          completed: newCompleted,
        });
      }
    } catch (err) {
      console.error("Failed to update habit status:", err.message);
    }
  };
}
