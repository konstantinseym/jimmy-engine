import ImgLink from "./ImgLink";

const SOCIAL_BUTTONS = [
  { id: 1, url: "", img: "/ico/facebook.png" },
  { id: 2, url: "", img: "/ico/linkedin.png" },
  { id: 3, url: "", img: "/ico/whatsapp.png" },
];

export default function SocialButtons() {
  return (
    <div className="flex gap-8">
      {SOCIAL_BUTTONS.map((socialButton) => (
        <ImgLink
          key={socialButton.id}
          url={socialButton.url}
          img={socialButton.img}
        />
      ))}
    </div>
  );
}
