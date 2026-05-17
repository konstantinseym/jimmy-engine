export default function BtnAsText({ children, onClick, type = "button" }) {
  return (
    <input
      className="hover:text-palette-green cursor-pointer transition"
      type={type}
      value={children}
      onClick={onClick}
    />
  );
}
