import Btn from "../UI/Btn";
import InputField from "../UI/InputField";
import InputTextArea from "../UI/InputTextArea";

export default function FormContactMe() {
  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      className="my-8 flex flex-col items-center gap-2 p-6"
      onSubmit={handleSubmit}
    >
      <InputField placeholder="your name" value="" />
      <InputField placeholder="e-mail" value="" />
      <InputTextArea placeholder="write everything you want" />
      <span className="mt-4">
        <Btn type="submit">Send</Btn>
      </span>
    </form>
  );
}
