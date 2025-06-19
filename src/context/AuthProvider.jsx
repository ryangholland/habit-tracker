import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(() => {
      const stored = localStorage.getItem("users");
      return stored ? JSON.parse(stored) : [];
    });
  
    useEffect(() => {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    }, []);
  
    useEffect(() => {
      localStorage.setItem("users", JSON.stringify(users));
    }, [users]);
  
    useEffect(() => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }, [user]);
  
    const login = (username, password) => {
      const found = users.find((u) => u.name === username);
      if (!found) {
        alert("User not found");
        return false;
      }
      if (found.password !== password) {
        alert("Incorrect password");
        return false;
      }
      setUser(found);
      return true;
    };
  
    const register = (username, password) => {
      const exists = users.find((u) => u.name === username);
      if (exists) {
        alert("Username already exists");
        return false;
      }
      const newUser = { name: username, password };
      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      return true;
    };
  
    const logout = () => setUser(null);
  
    return (
      <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
  