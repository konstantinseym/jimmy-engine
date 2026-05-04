import { Link } from "react-router-dom";

const LOGO_VALUE = "Jimmy Engine";

export default function Logo() {
  return (
    <Link to={"/"} className="text-palette-green text-3xl font-semibold">
      {LOGO_VALUE}
    </Link>
  );
}
