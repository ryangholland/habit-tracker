import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem("isGuest") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isGuest", isGuest);
  }, [isGuest]);

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

  const login = async (username, password) => {
    // Step 1: Look up the email from the username
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (profileError) {
      alert("Invalid username");
      return false;
    }

    const userId = profile.id;

    // Step 2: Get email from auth.users
    const { data: userRow, error: userError } = await supabase
      .from("users") // this is a Supabase *view* of auth.users
      .select("email")
      .eq("id", userId)
      .single();

    if (userError) {
      alert("Could not find associated email");
      return false;
    }

    const email = userRow.email;

    // Step 3: Log in with email + password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      alert("Invalid password");
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
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isGuest, setIsGuest }}
    >
      {children}
    </AuthContext.Provider>
  );
}
