import { Link } from "react-router-dom";

export default function AppLink({ children, to }) {
  return (
    <Link className="hover:text-accent transition" to={to}>
      {children}
    </Link>
  );
}
