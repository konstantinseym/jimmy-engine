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
      <div>
        <div className="flex items-center justify-center gap-1">
          <InputField placeholder="write smth..." />
          <Btn>Post</Btn>
        </div>

        {comments.map((comment) => (
          <p key={comment.id}>
            {comment.content} ///// {comment.created_at}
          </p>
        ))}
      </div>
    );
  }

  return;
}
