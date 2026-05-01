const HERO_IMAGE_PATH = "/img/001.png";
const HERO_MESSAGE = {
  title: "Welcome here",
  subtitle: "appreciate you stopping by",
};

("Welcome here");

export default function Hero() {
  return (
    <header className="mx-auto flex h-screen w-full max-w-7xl gap-16 py-32">
      <div className="flex flex-1 items-center justify-center">
        <img src={HERO_IMAGE_PATH} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h2 className="text-6xl font-semibold">{HERO_MESSAGE.title}</h2>
        <p>{HERO_MESSAGE.subtitle}</p>
      </div>
    </header>
  );
}
