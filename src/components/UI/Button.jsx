export default function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      className="hover:text-accent cursor-pointer transition"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
