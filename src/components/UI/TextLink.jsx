export default function TextLink({ children, href = "#" }) {
  return (
    <a className="hover:text-palette-green transition" href={href}>
      {children}
    </a>
  );
}
