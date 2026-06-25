export default function BtnAsText({ children, onClick }) {
  return (
    <button
      className="hover:text-palette-green cursor-pointer transition"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
