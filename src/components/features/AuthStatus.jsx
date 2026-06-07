import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import BtnAsText from "../UI/BtnAsText";

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error) console.log(error);

      setUser(data.user);
      setIsLoading(false);
    }

    getUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function signIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

    if (error) console.log(error);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) console.log(error);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <p>Checking authorization...</p>
      ) : !user ? (
        <BtnAsText onClick={signIn}>Login via Google</BtnAsText>
      ) : (
        <div className="flex items-center justify-center gap-4">
          {user.user_metadata.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt=""
              className="h-8 rounded-full"
            />
          )}
          <p>
            {user.user_metadata.full_name ||
              user.user_metadata.name ||
              user.email}
          </p>

          <BtnAsText onClick={signOut}>Log out</BtnAsText>
        </div>
      )}
    </div>
  );
}
