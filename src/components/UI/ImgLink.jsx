export default function ImgLink({ url, img }) {
  return (
    <a href={url}>
      <img className="w-12 transition hover:invert" src={img} />
    </a>
  );
}
