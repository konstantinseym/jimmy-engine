import { useState } from "react";

import Btn from "../UI/Btn";
import InputTextArea from "../UI/InputTextArea";

export default function FormContactMe({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputValue);
  }

  return (
    <form
      className="my-8 flex w-full flex-col items-center gap-3 p-6"
      onSubmit={handleSubmit}
    >
      <InputTextArea
        placeholder="write everything you want"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span className="mt-4">
        <Btn type="submit">{"Send"}</Btn>
      </span>
    </form>
  );
}
