import { useState } from "react";
import Clock from "../../UI/svg/Clock";
import Lock from "../../UI/svg/Lock";
import Btn from "../../UI/Btn";
import InputTextArea from "../../UI/InputTextArea";

export default function ContactForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputValue);
  }

  return (
    <form
      className="flex w-full flex-1 flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <h3>Message</h3>
      <InputTextArea
        value={inputValue}
        placeholder="Write everything you want. Be respectful."
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div className="flex w-full flex-col items-center gap-2 lg:flex-row lg:justify-between lg:px-8">
        <div className="text-text-muted flex items-center gap-2">
          <Lock width="12" />
          <p>Your message is private and secure</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock width="12" />
          <p>I usually reply within 24-48 hours.</p>
        </div>
        <Btn variant="pill" type="submit">
          Send
        </Btn>
      </div>
    </form>
  );
}
