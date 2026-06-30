import { useAuth } from "../../context/authContext";
import Btn from "../UI/Btn";
import LoginBtn from "../UI/LoginBtn";
import Logout from "../UI/svg/Logout";

export default function AuthStatus() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-xs">
      {isLoading ? (
        <p>Checking authorization...</p>
      ) : !isAuthenticated ? (
        <LoginBtn />
      ) : (
        <div className="flex items-center justify-center gap-4">
          {user.user_metadata.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt=""
              className="hidden h-8 rounded-full lg:block"
            />
          )}
          <p>
            {user.user_metadata.full_name ||
              user.user_metadata.name ||
              user.email}
          </p>

          <Btn variant="text" onClick={signOut}>
            <Logout width="16" />
          </Btn>
        </div>
      )}
    </div>
  );
}
