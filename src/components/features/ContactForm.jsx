import { useState } from "react";
import Clock from "../UI/svg/Clock";
import Lock from "../UI/svg/Lock";
import Button from "../UI/Button";
import TextArea from "../UI/TextArea";
import Send from "../UI/svg/Send";
import { CONTACT_VALIDATION_RULES } from "../../utils/validationRules";
import { validateMessage } from "../../utils/validateInput";

export default function ContactForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const validatedMessage = validateMessage(inputValue);
    if (validatedMessage) onSubmit(validatedMessage);
  }

  return (
    <form
      className="flex w-full flex-1 flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <TextArea
        value={inputValue}
        placeholder="Write everything you want. Be respectful."
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={CONTACT_VALIDATION_RULES.max}
      />

      <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-text-muted flex items-center gap-2">
            <Lock width="12" />
            <p>Your message is private and secure</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock width="12" />
            <p>I usually reply within 24-48 hours.</p>
          </div>
        </div>
        <Button type="submit">
          <Send width="40" />
        </Button>
      </div>
    </form>
  );
}
