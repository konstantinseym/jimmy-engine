export default function TagLabel({ label }) {
  return (
    <span className="bg-palette-gray hover:bg-palette-white hover:text-palette-black cursor-pointer rounded-md px-1.5 py-1 text-sm font-light transition">
      {label}
    </span>
  );
}
