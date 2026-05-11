import SocialButtons from "../../UI/SocialButtons";
import { forwardRef } from "react";

const HERO_IMAGE_PATH =
  "https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/layout/001.png";
const HERO_MESSAGE = {
  title: "Welcome here",
  subtitle: "appreciate you stopping by",
};

const Hero = forwardRef(function Hero(props, ref) {
  return (
    <header
      ref={ref}
      {...props}
      className="mx-auto flex h-screen w-full max-w-7xl gap-16 py-32"
    >
      <div className="flex flex-1 items-center justify-center">
        <img src={HERO_IMAGE_PATH} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-semibold">{HERO_MESSAGE.title}</h1>
          <p>{HERO_MESSAGE.subtitle}</p>
        </div>
        <SocialButtons />
      </div>
    </header>
  );
});

export default Hero;
