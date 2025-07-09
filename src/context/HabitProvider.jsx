import { useEffect, useState, useContext } from "react";
import { HabitContext } from "./HabitContext";
import { AuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";
import { useToday } from "../hooks/useToday";
import { ensureTodayInHistory, createNewHabit } from "../utils/habitUtils";

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isGuest } = useContext(AuthContext);
  const { isoDate } = useToday();

  useEffect(() => {
    if (isGuest) {
      // Load from localStorage
      const stored = localStorage.getItem("guest_habits");
      let parsed = [];

      if (stored) {
        try {
          parsed = JSON.parse(stored);
        } catch {
          parsed = [];
        }
      }

      // If empty, generate new dummy data
      if (!parsed.length) {
        const demoNames = ["Drink Water", "Stretch", "Read"];
        const pastDates = Array.from({ length: 21 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().slice(0, 10);
        });

        parsed = demoNames.map((name) => {
          const habit = createNewHabit(name, isoDate);
          habit.history = {};
          habit.activeDays = [1, 2, 3, 4, 5, 6, 0];

          pastDates.forEach((d) => {
            const rand = Math.random() < 0.7;
            habit.history[d] = rand;
          });

          habit.completedToday = habit.history[isoDate] || false;
          return habit;
        });

        localStorage.setItem("guest_habits", JSON.stringify(parsed));
      }

      const withToday = ensureTodayInHistory(parsed, isoDate);
      setHabits(withToday);
      setLoading(false);
      return;
    }

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
  }, [user, isGuest, isoDate]);

  const deleteHabit = async (id) => {
    if (isGuest) {
      const updated = habits.filter((h) => h.id !== id);
      setHabits(updated);
      localStorage.setItem("guest_habits", JSON.stringify(updated));
      return;
    }

    const { error } = await supabase.from("habits").delete().eq("id", id);

    if (error) {
      console.error("Failed to delete habit:", error.message);
      return;
    }

    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <HabitContext.Provider value={{ habits, setHabits, deleteHabit }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white"></div>
      ) : (
        children
      )}
    </HabitContext.Provider>
  );
}
