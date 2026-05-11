import Logo from "../UI/Logo";
import SocialButtons from "../UI/SocialButtons";
import TextLink from "../UI/TextLink";

export default function Footer() {
  return (
    <footer className="bg-palette-darkgray flex w-full flex-col items-center gap-8 pt-16 pb-8">
      <div className="flex w-full items-center justify-around">
        <Logo />
        <SocialButtons />
      </div>
      <TextLink>Privacy Commitment</TextLink>
    </footer>
  );
}
