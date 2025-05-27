import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useLocalStorage } from "./hooks/useLocalStorage";

import Today from "./pages/Today";
import Stats from "./pages/Stats";
import ThisWeek from "./pages/ThisWeek";
import Layout from "./layouts/Layout";

function App() {
  const [habits, setHabits] = useLocalStorage("habits", [
    {
      id: "uuid",
      name: "Read 10 pages",
      completedToday: true,
      history: {
        "2025-05-26": true,
        "2025-05-25": false,
      },
    },
    {
      id: "uuid2",
      name: "Work out",
      completedToday: true,
      history: {
        "2025-05-26": true,
        "2025-05-25": false,
      },
    },
  ]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Today habits={habits} setHabits={setHabits} />,
        },
        {
          path: "/this-week",
          element: <ThisWeek habits={habits} />,
        },
        {
          path: "/stats",
          element: <Stats habits={habits} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
