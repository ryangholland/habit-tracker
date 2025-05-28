import { HabitContext } from "./HabitContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function HabitProvider({ children }) {
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

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
}
