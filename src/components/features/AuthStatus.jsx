import { useAuth } from "../../context/authContext";
import Btn from "../UI/Btn";

export default function AuthStatus() {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-xs">
      {isLoading ? (
        <p>Checking authorization...</p>
      ) : !isAuthenticated ? (
        <Btn variant="text" onClick={signIn}>
          Login via Google
        </Btn>
      ) : (
        <div className="flex items-center justify-center gap-2">
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

          <Btn variant="text" onClick={signOut}>
            Log out
          </Btn>
        </div>
      )}
    </div>
  );
}
