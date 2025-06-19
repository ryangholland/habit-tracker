import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Today from "./pages/Today";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

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
      element: (
        <ProtectedRoute>
          <Layout>
            <Today />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <Layout>
            <Settings />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/stats",
      element: (
        <ProtectedRoute>
          <Layout>
            <Stats />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
