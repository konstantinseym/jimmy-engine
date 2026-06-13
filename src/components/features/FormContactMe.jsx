import { useState } from "react";
import { insertContactMessage } from "../../api/contactApi";
import { CONTACT_VALIDATION_RULES } from "../../utils/validationRules";
import { useAuth } from "../../context/authContext";

import Btn from "../UI/Btn";
import InputTextArea from "../UI/InputTextArea";
import ModalAlert from "../UI/ModalAlert";

export default function FormContactMe() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedData = message.trim();

    try {
      setIsLoading(true);
      await insertContactMessage(normalizedData, user);
      setMessage("");
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="my-8 flex w-full flex-col items-center gap-3 p-6"
      onSubmit={handleSubmit}
    >
      <InputTextArea
        name="message"
        placeholder="write everything you want"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={CONTACT_VALIDATION_RULES.messageMax}
      />
      <span className="mt-4">
        <Btn type="submit" disabled={isLoading}>
          {"Send"}
        </Btn>
      </span>
      <ModalAlert
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        message="Your message has been received successfully."
      />
    </form>
  );
}
