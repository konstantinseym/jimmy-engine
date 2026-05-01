import { useState } from "react";

export default function InputField({ placeholder, value }) {
  const [inputValue, setInputValue] = useState(value);

  return (
    <input
      type="text"
      className="border-palette-gray bg-palette-white text-palette-black focus:border-palette-green w-sm rounded-md border-2 px-2 py-1 outline-0 transition"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
