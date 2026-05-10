export default function BtnAsText({
  children,
  highlighted = false,
  onClick,
  type = "button",
}) {
  return (
    <input
      className={
        "hover:text-palette-green cursor-pointer transition " +
        (highlighted ? "text-palette-green" : "")
      }
      type={type}
      value={children}
      onClick={onClick}
    />
  );
}
