import Ggl from "../UI/svg/Ggl";
import Button from "./Button";
import { useAuth } from "../../context/authContext";

export default function LoginButton() {
  const { signIn } = useAuth();

  return (
    <div className="text-xs">
      <Button onClick={signIn}>
        <div className="flex items-center gap-2">
          <Ggl width="18" />
          Log In
        </div>
      </Button>
    </div>
  );
}
