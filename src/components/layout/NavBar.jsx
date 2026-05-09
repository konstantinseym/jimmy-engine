import Logo from "../UI/Logo";
import NavLinks from "./NavLinks";
import { useScroll } from "../../hooks/useScroll";

const NAV_STYLES = {
  min: "border-palette-green bg-palette-faded fixed top-0 left-1/2 mt-8 flex -translate-x-1/2 justify-center rounded-full border px-8 py-4 backdrop-blur-xs",
  max: "fixed top-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 justify-between px-8 py-12",
};

export default function NavBar() {
  const isScrolled = useScroll();

  return (
    <nav className={!isScrolled ? NAV_STYLES.max : NAV_STYLES.min}>
      {!isScrolled ? <Logo /> : ""}
      <NavLinks />
    </nav>
  );
}
