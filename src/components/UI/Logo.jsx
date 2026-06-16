import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"} className="text-palette-green text-3xl font-semibold">
      <p>
        Jimmy <span className="text-palette-white">Engine</span>
      </p>
    </Link>
  );
}
