import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Today from "./pages/Today";
import Stats from "./pages/Stats";
import ThisWeek from "./pages/ThisWeek";
import Layout from "./layouts/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Today />,
        },
        {
          path: "/this-week",
          element: <ThisWeek />,
        },
        {
          path: "/stats",
          element: <Stats />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
