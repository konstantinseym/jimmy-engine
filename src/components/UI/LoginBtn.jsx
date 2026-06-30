import Ggl from "../UI/svg/Ggl";
import Btn from "./Btn";
import { useAuth } from "../../context/authContext";

export default function LoginBtn() {
  const { signIn } = useAuth();

  return (
    <div className="text-xs">
      <Btn variant="text" onClick={signIn}>
        <div className="flex items-center gap-2">
          <Ggl width="18" />
          Log In
        </div>
      </Btn>
    </div>
  );
}
