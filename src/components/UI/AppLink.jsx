import { Link } from "react-router-dom";

export default function AppLink({ children, to }) {
  return (
    <Link className="hover:text-palette-green underline transition" to={to}>
      {children}
    </Link>
  );
}
