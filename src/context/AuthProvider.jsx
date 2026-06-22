import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      setUser(data?.session?.user ?? null);
      setIsLoading(false);
    }

    getSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function signIn() {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + window.location.pathname,
      },
    });

    if (error) {
      setIsLoading(false);
      throw error;
    }
  }

  async function signOut() {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsLoading(false);
      throw error;
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
