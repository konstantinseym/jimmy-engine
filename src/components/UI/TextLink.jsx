export default function TextLink({ children }) {
  return (
    <a className="hover:text-palette-green transition" href="#">
      {children}
    </a>
  );
}
