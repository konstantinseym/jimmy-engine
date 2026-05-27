import Btn from "../UI/Btn";
import InputField from "../UI/InputField";

export default function PostComments() {
  return (
    <div className="flex content-between items-center gap-1">
      <InputField placeholder="write smth..." />
      <Btn>Post</Btn>
    </div>
  );
}
