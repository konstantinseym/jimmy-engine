import Logo from "../UI/Logo";
import TextLink from "../UI/TextLink";

export default function Footer() {
  return (
    <footer className="bg-palette-darkgray flex w-full flex-col items-center gap-8 pt-16 pb-8">
      <Logo />
      <TextLink href="https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/docs/privacy-commitment.pdf">
        Privacy Commitment
      </TextLink>
    </footer>
  );
}
