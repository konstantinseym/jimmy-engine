export default function TextArea({
  name,
  placeholder,
  value,
  onChange,
  maxLength,
}) {
  return (
    <textarea
      className="text-palette-white w-full flex-1 resize-none outline-0 transition"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
