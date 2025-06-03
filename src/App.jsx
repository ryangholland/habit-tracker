import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Today from "./pages/Today";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
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
          path: "/stats",
          element: <Stats />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
