import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, isGuest } = useContext(AuthContext);
  return user || isGuest ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
