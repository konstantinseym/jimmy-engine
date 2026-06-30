import { Link } from "react-router-dom";

export default function TagLabel({ label }) {
  return (
    <Link to={"/posts?search=" + label}>
      <span className="hover:bg-palette-white hover:text-text-muted cursor-pointer rounded-md border border-white/50 px-1.5 py-1 text-xs font-light transition lg:text-sm">
        {label}
      </span>
    </Link>
  );
}
