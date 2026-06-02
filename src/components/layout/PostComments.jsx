import { getComments } from "../../api/postsApi";
import { useState, useRef } from "react";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";
import { COMMENT_VALIDATION_RULES } from "../../utils/validationRules";
import { formatDate } from "../../utils/formatDate";
import { motion } from "motion/react";
import { DEFAULT_TRANSITION_RULES } from "../../config/motion.config";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function PostComments({ postId }) {
  const commentsQuery = useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam = 0 }) => getComments(postId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });

  const [commentInputValue, setCommentInputValue] = useState("");
  const inputRef = useRef(null);

  function loadMore() {
    commentsQuery.fetchNextPage();
  }

  function handleInputChange(e) {
    setCommentInputValue(e.target.value);
  }

  async function handlePostComment(e) {
    e.preventDefault();

    const normalizedData = commentInputValue.trim();
    console.log(normalizedData);
  }

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
        <Btn type="submit">Post</Btn>
      </form>

      {(commentsQuery.data?.pages?.flat() || []).map((comment) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={DEFAULT_TRANSITION_RULES}
          className="my-4 flex w-full max-w-md flex-col gap-1 px-6 lg:px-12"
          key={comment.id}
        >
          <p className="text-sm">{comment.content}</p>
          <p className="text-palette-lightgray text-right text-xs">
            {formatDate(comment.created_at)}
          </p>
        </motion.div>
      ))}
      <Btn onClick={loadMore}>load more</Btn>
    </div>
  );
}
