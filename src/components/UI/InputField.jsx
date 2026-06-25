import { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  { placeholder, value, onChange, maxLength },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      className="bg-palette-white text-palette-black focus:border-palette-green border-palette-gray h-8 w-48 rounded-full border-3 px-3 text-xs outline-0 transition"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
});

export default InputField;
