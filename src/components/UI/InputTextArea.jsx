export default function InputTextArea({
  name,
  placeholder,
  value,
  onChange,
  maxLength,
}) {
  return (
    <textarea
      className="border-palette-gray bg-palette-white text-palette-black focus:border-palette-green h-48 w-sm resize-none rounded-md border-2 px-2 py-1 outline-0 transition"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
