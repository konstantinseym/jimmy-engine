import Logo from "../UI/Logo";
import ExternalLink from "../UI/ExternalLink";
import RouterLink from "../UI/RouterLink";

export default function Footer() {
  return (
    <footer className="bg-palette-black flex w-full justify-center pt-16 pb-8 lg:justify-around">
      <div className="hidden lg:block">
        <Logo />
      </div>
      <div className="text-text-muted flex flex-col items-start gap-2 text-sm">
        <p className="text-palette-white">NAVIGATION</p>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
        <ExternalLink href="https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/docs/privacy-commitment.pdf">
          Privacy Commitment
        </ExternalLink>
      </div>
    </footer>
  );
}
