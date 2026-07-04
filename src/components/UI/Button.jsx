export default function Button({ children, onClick, disabled = false }) {
  return (
    <button
      className="hover:text-accent cursor-pointer transition"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
