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
      className="border-palette-gray bg-palette-white text-palette-black focus:border-palette-green h-12 w-sm rounded-full border-4 px-3 outline-0 transition"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
