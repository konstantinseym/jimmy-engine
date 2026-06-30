export default function InputTextArea({
  name,
  placeholder,
  value,
  onChange,
  maxLength,
}) {
  return (
    <textarea
      className="text-palette-white focus:border-accent w-full flex-1 resize-none rounded-3xl border border-white/50 px-5 py-3 outline-0 transition"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
