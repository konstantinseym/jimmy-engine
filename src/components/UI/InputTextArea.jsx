export default function InputTextArea({
  name,
  placeholder,
  value,
  onChange,
  maxLength,
}) {
  return (
    <textarea
      className="border-palette-gray bg-palette-white text-palette-black focus:border-palette-green h-48 w-md resize-none rounded-3xl border-2 px-3 py-3 outline-0 transition"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
