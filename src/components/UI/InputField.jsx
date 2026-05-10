export default function InputField({
  name,
  placeholder,
  value,
  onChange,
  maxLength,
}) {
  return (
    <input
      type="text"
      className="border-palette-gray bg-palette-white text-palette-black focus:border-palette-green w-sm rounded-md border-2 px-2 py-1 outline-0 transition"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
