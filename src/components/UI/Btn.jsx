export default function Btn({ children }) {
  return (
    <input
      className="bg-palette-green hover:bg-palette-white hover:text-palette-green w-36 cursor-pointer rounded-md py-2 transition"
      type="button"
      value={children}
    />
  );
}
