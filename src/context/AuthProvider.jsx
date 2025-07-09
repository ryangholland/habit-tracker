import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../supabaseClient";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

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
    let initialLoad = true;
    
    // Load current session on mount
    supabase.auth.getSession().then(({ data }) => {
      handleSession(data?.session).finally(() => setAuthLoading(false));
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
    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        return { success: false, message: signUpError.message };
      }

      const userId = signUpData.user?.id;

      if (userId) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: userId,
          username,
        });

        if (profileError) {
          if (profileError.code === "23505") {
            return { success: false, message: "Username already taken." };
          } else {
            return { success: false, message: profileError.message };
          }
        }
      }

      return { success: true };
    } catch (err) {
      console.error("Register failed:", err);
      return { success: false, message: "Unexpected error. Please try again." };
    }
  };

  const login = async (username, password) => {
    try {
      // Step 1: Find user by username
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single();

      if (profileError) {
        return { success: false, message: "Username not found." };
      }

      const userId = profile.id;

      // Step 2: Get email tied to that user
      const { data: userRow, error: userError } = await supabase
        .from("users")
        .select("email")
        .eq("id", userId)
        .single();

      if (userError) {
        return {
          success: false,
          message: "Something went wrong. Please try again later.",
        };
      }

      const email = userRow.email;

      // Step 3: Attempt sign-in with email + password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        return { success: false, message: "Incorrect password." };
      }

      // Step 4: Success — clear guest mode
      setIsGuest(false);
      localStorage.removeItem("isGuest");

      return { success: true };
    } catch (err) {
      console.error("Login failed:", err);
      return {
        success: false,
        message: "Unexpected error. Please try again.",
      };
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
      value={{
        user,
        login,
        register,
        logout,
        isGuest,
        setIsGuest,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
