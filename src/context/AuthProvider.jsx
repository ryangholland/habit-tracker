import { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("isGuest") || "false");
    } catch {
      return false;
    }
  });

  // persist guest flag
  useEffect(() => {
    localStorage.setItem("isGuest", JSON.stringify(isGuest));
  }, [isGuest]);

  // initialize + listen for auth changes
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      if (data.session?.user) setIsGuest(false);
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setIsGuest(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // register with email + password
  const register = useCallback(async (email, password) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return { success: false, message: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Unknown error" };
    }
  }, []);

  // login with email + password
  const login = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { success: false, message: error.message };
      setUser(data.user ?? null);
      setIsGuest(false);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Unknown error" };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        setIsGuest,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
