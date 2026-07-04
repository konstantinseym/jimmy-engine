import Logo from "../UI/Logo";

import AuthStatus from "../features/AuthStatus";
import GlassContainer from "../UI/GlassContainer";

export default function NavBar({ elements }) {
  return (
    <nav className="fixed top-5 left-0 z-20 w-full text-sm">
      <GlassContainer addClassName="rounded-4xl lg:rounded-full mx-4 flex flex-col items-center gap-2 px-12 py-3 lg:py-4 lg:mx-auto lg:max-w-6xl lg:flex-row lg:justify-between">
        <div className="hidden lg:block">
          <Logo />
        </div>
        <ul className="flex items-center gap-8">
          {elements.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
        <AuthStatus />
      </GlassContainer>
    </nav>
  );
}
