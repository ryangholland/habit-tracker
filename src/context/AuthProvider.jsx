import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isGuest, setIsGuest] = useState(() => {
    return localStorage.getItem("isGuest") === "true";
  });

  useEffect(() => {
    if (user) {
      setIsGuest(false);
      localStorage.removeItem("isGuest");
    } else {
      localStorage.setItem("isGuest", isGuest);
    }
  }, [user, isGuest]);

  // Shared function to hydrate user
  async function handleSession(session) {
    const baseUser = session?.user;

    if (baseUser) {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", baseUser.id)
          .single();

        if (error) {
          console.error("Failed to fetch profile:", error.message);
        }

        setUser({
          ...baseUser,
          username: profile?.username || null,
        });

        setIsGuest(false);
        localStorage.removeItem("isGuest");
      } catch (err) {
        console.error("Error handling session:", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    // Load current session on mount
    supabase.auth.getSession().then(({ data }) => {
      handleSession(data?.session);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleSession(session);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const register = async (username, email, password) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      alert(signUpError.message);
      return false;
    }

    const userId = signUpData.user?.id;

    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        username,
      });

      if (profileError) {
        if (profileError.code === "23505") {
          alert("Username already taken.");
        } else {
          alert(profileError.message);
        }
        return false;
      }
    }

    return true;
  };

  const login = async (username, password) => {
    try {
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

      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("email")
        .eq("id", userId)
        .single();

      if (userError) {
        alert("Could not find associated email");
        return false;
      }

      const email = userRow.email;

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        alert("Invalid password");
        return false;
      }

      setIsGuest(false);
      localStorage.removeItem("isGuest");

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("isGuest");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isGuest, setIsGuest }}
    >
      {children}
    </AuthContext.Provider>
  );
}
