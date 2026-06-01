import { getComments } from "../../api/postsApi";
import { useState, useEffect, useRef } from "react";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";
import { postComment } from "../../api/postsApi";
import { COMMENT_VALIDATION_RULES } from "../../utils/validationRules";
import { formatDate } from "../../utils/formatDate";
import { motion } from "motion/react";
import {
  LAYOUT_TRANSITION_RULES,
  SLOW_TRANSITION_RULES,
} from "../../config/motion.config";

export default function PostComments({ postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const inputRef = useRef(null);
  const lastCommentRef = useRef(null);

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  function handleInputChange(e) {
    setCommentInputValue(e.target.value);
  }

  async function handlePostComment(e) {
    e.preventDefault();

    const normalizedData = commentInputValue.trim();

    try {
      setIsLoading(true);
      const newComment = await postComment(postId, normalizedData);
      setComments((prev) => [...prev, newComment]);
      setCommentInputValue("");
      inputRef.current?.blur();
      lastCommentRef.current?.scrollIntoView();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const data = await getComments(postId, page);

      if (data.length > 0) {
        setComments((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }
    })();
  }, [postId, page]);

  return (
    <div className="flex flex-col items-center">
      <form
        className="mb-4 flex w-full items-center justify-center gap-1"
        onSubmit={handlePostComment}
      >
        <InputField
          ref={inputRef}
          placeholder="write smth..."
          value={commentInputValue}
          onChange={handleInputChange}
          maxLength={COMMENT_VALIDATION_RULES.max}
        />
        <Btn type="submit" disabled={isLoading}>
          Post
        </Btn>
      </form>

      <motion.div
        className="flex flex-col items-center"
        layout
        transition={LAYOUT_TRANSITION_RULES}
      >
        {comments.map((comment, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={SLOW_TRANSITION_RULES}
            ref={index === comments.length - 1 ? lastCommentRef : null}
            className="my-4 flex w-full max-w-md flex-col gap-1 px-6 lg:px-12"
            key={comment.id}
          >
            <p className="text-sm">{comment.content}</p>
            <p className="text-palette-lightgray text-right text-xs">
              {formatDate(comment.created_at)}
            </p>
          </motion.div>
        ))}
        <Btn onClick={loadMore} disabled={!hasMore}>
          load more
        </Btn>
      </motion.div>
    </div>
  );
}
