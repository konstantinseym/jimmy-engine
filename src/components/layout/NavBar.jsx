import Logo from "../UI/Logo";
import NavLinks from "./NavLinks";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 justify-between px-8 py-12">
      <Logo />
      <NavLinks />
    </nav>
  );
}
