import Logo from "../UI/Logo";
import TextLink from "../UI/TextLink";

export default function Footer() {
  return (
    <footer className="bg-palette-darkgray flex w-full flex-col items-center gap-8 pt-16 pb-8">
      <Logo />
      <TextLink>Privacy Commitment</TextLink>
    </footer>
  );
}
