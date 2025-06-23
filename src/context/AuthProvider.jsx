import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user on initial load
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      return false;
    }
    return true;
  };

  const register = async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      return false;
    }
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
