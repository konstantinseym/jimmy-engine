import Btn from "../UI/Btn";
import InputField from "../UI/InputField";

export default function PostComments() {
  return (
    <div className="flex items-center justify-center gap-1">
      <InputField placeholder="write smth..." />
      <Btn>Post</Btn>
    </div>
  );
}
