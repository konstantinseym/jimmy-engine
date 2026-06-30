export default function Btn({
  variant = "pill",
  children,
  onClick,
  disabled = false,
}) {
  const variantClass =
    variant === "pill"
      ? "w-min-32 text-palette-white border-accent/50 hover:border-accent cursor-pointer rounded-full border px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-30"
      : "hover:text-accent cursor-pointer transition";

  return (
    <button className={variantClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
