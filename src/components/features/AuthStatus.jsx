import { useAuth } from "../../context/authContext";
import BtnAsText from "../UI/BtnAsText";

export default function AuthStatus() {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <p>Checking authorization...</p>
      ) : !isAuthenticated ? (
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
