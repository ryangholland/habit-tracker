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
    // Check session on load
    supabase.auth.getSession().then(async ({ data }) => {
      const baseUser = data?.session?.user;

      if (baseUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", baseUser.id)
          .single();

        setUser({
          ...baseUser,
          username: profile?.username || null,
        });
      } else {
        setUser(null);
      }
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const baseUser = session?.user;

        if (baseUser) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", baseUser.id)
            .single();

          setUser({
            ...baseUser,
            username: profile?.username || null,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  const register = async (username, email, password) => {
    // Step 1: Create user in auth.users
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      alert(signUpError.message);
      return false;
    }

    const userId = signUpData.user?.id;

    // Step 2: Insert into profiles
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
    // Step 1: Get user ID from profiles
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

    // Step 2: Get email from users view
    const { data: userRow, error: userError } = await supabase
      .from("users") // Supabase view for auth.users
      .select("email")
      .eq("id", userId)
      .single();

    if (userError) {
      alert("Could not find associated email");
      return false;
    }

    const email = userRow.email;

    // Step 3: Log in using email + password
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
