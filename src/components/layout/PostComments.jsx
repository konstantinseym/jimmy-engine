import { getComments } from "../../api/postsApi";
import { useState, useEffect } from "react";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";
import { postComment } from "../../api/postsApi";
import { COMMENT_VALIDATION_RULES } from "../../utils/validationRules";

export default function PostComments({ postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState();
  const [commentInputValue, setCommentInputValue] = useState("");

  async function loadComments() {
    const data = await getComments(postId);
    setComments(data);
  }

  function handleInputChange(e) {
    setCommentInputValue(e.target.value);
  }

  async function handlePostComment(e) {
    e.preventDefault();

    const normalizedData = commentInputValue.trim();

    try {
      setIsLoading(true);
      await postComment(postId, normalizedData);
      await loadComments();
      setCommentInputValue("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, []);

  if (comments) {
    return (
      <div className="flex flex-col items-center">
        <form
          className="mb-4 flex w-full items-center justify-center gap-1"
          onSubmit={handlePostComment}
        >
          <InputField
            placeholder="write smth..."
            value={commentInputValue}
            onChange={handleInputChange}
            maxLength={COMMENT_VALIDATION_RULES.max}
          />
          <Btn type="submit" disabled={isLoading}>
            Post
          </Btn>
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
