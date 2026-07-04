export default function ExternalLink({ children, href = "#" }) {
  return (
    <a className="hover:text-accent transition" href={href} target="_blank">
      {children}
    </a>
  );
}
