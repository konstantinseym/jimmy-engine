import { Link } from "react-router-dom";

export default function RouterLink({ children, to }) {
  return (
    <Link className="hover:text-accent transition" to={to}>
      {children}
    </Link>
  );
}
