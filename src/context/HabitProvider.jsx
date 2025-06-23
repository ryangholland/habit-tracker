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

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {!loading && children}
    </HabitContext.Provider>
  );
}
