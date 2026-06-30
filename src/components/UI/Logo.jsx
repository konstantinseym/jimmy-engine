import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"} className="text-accent text-3xl font-semibold">
      <span>
        Jimmy <span className="text-palette-white">Engine</span>
      </span>
    </Link>
  );
}
