import TextLink from "../UI/TextLink";

const NAV_LINKS = [
  {
    id: 1,
    href: "#",
    label: "Home",
  },
  {
    id: 2,
    href: "#",
    label: "Posts",
  },
  {
    id: 3,
    href: "#",
    label: "Contact me",
  },
];

export default function NavLinks() {
  return (
    <ul className="flex gap-12">
      {NAV_LINKS.map((link) => (
        <li key={link.id}>
          <TextLink href={link.href}>{link.label}</TextLink>
        </li>
      ))}
    </ul>
  );
}
