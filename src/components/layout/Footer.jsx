import Logo from "../UI/Logo";
import TextLink from "../UI/TextLink";
import AppLink from "../UI/AppLink";

export default function Footer() {
  return (
    <footer className="bg-background flex w-full justify-center pt-16 pb-8 lg:justify-around">
      <div className="hidden lg:block">
        <Logo />
      </div>
      <div className="text-text-muted flex flex-col items-start gap-2 text-sm">
        <AppLink to="/">Home</AppLink>
        <AppLink to="/posts">Posts</AppLink>
        <TextLink href="https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/docs/privacy-commitment.pdf">
          Privacy Commitment
        </TextLink>
      </div>
    </footer>
  );
}
