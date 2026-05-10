import { useState } from "react";
import { insertContactMessage } from "../../api/contactApi";
import { CONTACT_VALIDATION_RULES } from "../../utils/validationRules";

import Btn from "../UI/Btn";
import InputField from "../UI/InputField";
import InputTextArea from "../UI/InputTextArea";
import ModalAlert from "../UI/ModalAlert";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  message: "",
};

export default function FormContactMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValue, setFormValue] = useState(INITIAL_FORM_STATE);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedData = {
      name: formValue.name.trim(),
      email: formValue.email.trim(),
      message: formValue.message.trim(),
    };

    try {
      setIsLoading(true);
      await insertContactMessage(normalizedData);
      setFormValue(INITIAL_FORM_STATE);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  }

  return (
    <form
      className="my-8 flex flex-col items-center gap-2 p-6"
      onSubmit={handleSubmit}
    >
      <InputField
        name="name"
        placeholder="your name"
        value={formValue.name}
        onChange={handleInputChange}
        maxLength={CONTACT_VALIDATION_RULES.nameMax}
      />
      <InputField
        name="email"
        placeholder="e-mail"
        value={formValue.email}
        onChange={handleInputChange}
        maxLength={CONTACT_VALIDATION_RULES.emailMax}
      />
      <InputTextArea
        name="message"
        placeholder="write everything you want"
        value={formValue.message}
        onChange={handleInputChange}
        maxLength={CONTACT_VALIDATION_RULES.messageMax}
      />
      <span className="mt-4">
        <Btn type="submit" disabled={isLoading}>
          {isLoading ? "..." : "Send"}
        </Btn>
      </span>
      <ModalAlert
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        message="Thank you for reaching out. Your message has been received successfully."
      />
    </form>
  );
}
