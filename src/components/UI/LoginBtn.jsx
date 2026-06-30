import Ggl from "../UI/svg/Ggl";
import Btn from "./Btn";
import { useAuth } from "../../context/authContext";

export default function LoginBtn() {
  const { signIn } = useAuth();

  return (
    <div className="text-xs">
      <Btn variant="text" onClick={signIn}>
        <div className="border-accent/50 flex items-center gap-2 rounded-2xl border px-3 py-2">
          <Ggl width="18" />
          Log In
        </div>
      </Btn>
    </div>
  );
}
