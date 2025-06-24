import { HabitContext } from "./HabitContext";
import { useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthContext";

export function HabitProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch habits + history on load
  useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    const fetchHabits = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("habits")
        .select(
          `
          id,
          name,
          active_days,
          habit_history (
            date,
            completed
          )
        `
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching habits:", error);
        setHabits([]);
        return;
      }

      const transformed = data.map((habit) => {
        const history = {};
        habit.habit_history.forEach((entry) => {
          history[entry.date] = entry.completed;
        });

        return {
          id: habit.id,
          name: habit.name,
          activeDays: habit.active_days,
          history,
          completedToday:
            history[new Date().toISOString().slice(0, 10)] || false,
        };
      });

      setHabits(transformed);
      setLoading(false);
    };

    fetchHabits();
  }, [user]);

  const deleteHabit = async (id) => {
    const { error } = await supabase.from("habits").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete habit:", error.message);
      return;
    }

    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <HabitContext.Provider value={{ habits, setHabits, deleteHabit }}>
      {!loading && children}
    </HabitContext.Provider>
  );
}
