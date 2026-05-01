import { useState } from "react";

export default function InputTextArea({ placeholder, value }) {
  const [inputValue, setInputValue] = useState(value);

  return (
    <textarea
      className="border-palette-gray bg-palette-white text-palette-black focus:border-palette-green h-48 w-sm resize-none rounded-md border-2 px-2 py-1 outline-0 transition"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
