export default function Btn({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <input
      className="bg-palette-green hover:bg-palette-white hover:text-palette-green w-32 cursor-pointer rounded-md py-2 transition disabled:cursor-not-allowed disabled:opacity-30"
      type={type}
      value={children}
      onClick={onClick}
      disabled={disabled}
    />
  );
}
