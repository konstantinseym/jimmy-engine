export default function Btn({ children, onClick, disabled = false }) {
  return (
    <button
      className="hover:bg-palette-white w-min-32 text-palette-black bg-palette-green cursor-pointer rounded-full px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-30"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
