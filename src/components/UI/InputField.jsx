import { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  { name, placeholder, value, onChange, maxLength },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      className="bg-palette-white text-palette-black focus:border-palette-green border-palette-gray h-12 w-full max-w-sm rounded-full border-4 px-5 outline-0 transition"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
});

export default InputField;
