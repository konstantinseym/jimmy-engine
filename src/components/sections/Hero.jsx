import ImgLink from "../UI/ImgLink";

const HERO_IMAGE_PATH = "/img/001.png";
const HERO_MESSAGE = {
  title: "Welcome here",
  subtitle: "appreciate you stopping by",
};
const SOCIAL_BUTTONS = [
  { id: 1, url: "", img: "/ico/facebook.png" },
  { id: 2, url: "", img: "/ico/linkedin.png" },
  { id: 3, url: "", img: "/ico/whatsapp.png" },
];

export default function Hero() {
  return (
    <header className="mx-auto flex h-screen w-full max-w-7xl gap-16 py-32">
      <div className="flex flex-1 items-center justify-center">
        <img src={HERO_IMAGE_PATH} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-semibold">{HERO_MESSAGE.title}</h1>
          <p>{HERO_MESSAGE.subtitle}</p>
        </div>

        <div className="flex gap-8">
          {SOCIAL_BUTTONS.map((socialButton) => (
            <ImgLink
              key={socialButton.id}
              url={socialButton.url}
              img={socialButton.img}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
