import { getComments } from "../../api/postsApi";
import { useState, useEffect } from "react";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";

export default function PostComments({ postId }) {
  const [comments, setComments] = useState();

  useEffect(() => {
    async function loadComments() {
      const data = await getComments(postId);
      setComments(data);
    }

    loadComments();
  }, [postId]);

  if (comments) {
    return (
      <div className="flex flex-col items-center">
        <form className="mb-4 flex w-full items-center justify-center gap-1">
          <InputField placeholder="write smth..." />
          <Btn type="submit">Post</Btn>
        </form>

        {comments.map((comment) => (
          <div className="mt-2 flex max-w-md flex-col" key={comment.id}>
            <p className="text-sm">{comment.content}</p>
            <p className="text-palette-lightgray text-right text-xs">
              {comment.created_at}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return;
}
