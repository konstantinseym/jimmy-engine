export default function Btn({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <input
      className="bg-palette-green hover:bg-palette-white hover:text-palette-green w-36 cursor-pointer rounded-md py-2 transition"
      type={type}
      value={children}
      onClick={onClick}
      disabled={disabled}
    />
  );
}
