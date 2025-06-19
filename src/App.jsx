import { useContext } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Layout from "./layouts/Layout";

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/",
      element: user ? <Layout /> : <Navigate to="/login" />,
      children: user
        ? [
            { path: "/", element: <Today /> },
            { path: "/stats", element: <Stats /> },
            { path: "/settings", element: <Settings /> },
          ]
        : [],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
