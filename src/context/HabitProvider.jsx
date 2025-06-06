import { HabitContext } from "./HabitContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToday } from "../hooks/useToday";
import { ensureTodayInHistory } from "../utils/habitUtils";

export function HabitProvider({ children }) {
  const { isoDate } = useToday();

  const [habits, setHabits] = useLocalStorage("habits", [
    {
      id: 1,
      name: "Read 10 pages",
      completedToday: false,
      history: {
        "2025-05-26": true,
        "2025-05-25": false,
      },
    },
    {
      id: 2,
      name: "Work out",
      completedToday: false,
      history: {
        "2025-05-26": true,
        "2025-05-25": false,
      },
    },
  ]);

  // Ensure today's entry is always present
  const updatedHabits = ensureTodayInHistory(habits, isoDate);

  // Delete logic exposed via context
  function deleteHabit(id) {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  }

  return (
    <HabitContext.Provider
      value={{ habits: updatedHabits, setHabits, deleteHabit }}
    >
      {children}
    </HabitContext.Provider>
  );
}
