export default function Btn({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <input
      className="hover:bg-palette-white w-min-32 text-palette-black bg-palette-green cursor-pointer rounded-full px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-30"
      type={type}
      value={children}
      onClick={onClick}
      disabled={disabled}
    />
  );
}
