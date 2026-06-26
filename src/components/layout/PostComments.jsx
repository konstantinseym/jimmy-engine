import { addComment, getComments } from "../../api/postsApi";
import { useState, useRef } from "react";
import Btn from "../UI/Btn";

import { COMMENT_VALIDATION_RULES } from "../../utils/validationRules";
import { formatDate } from "../../utils/formatDate";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import { AnimatePresence, motion } from "motion/react";
import {
  FADE_TRANSITION_RULES,
  MOTION_TRANSITION_RULES,
} from "../../config/motion.config";
import { useAuth } from "../../context/authContext";

export default function PostComments({ postId }) {
  const { isAuthenticated, signIn } = useAuth();

  const queryClient = useQueryClient();

  const commentsQuery = useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam = 0 }) => getComments(postId, pageParam),
    retry: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (commentText) => addComment(postId, commentText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setCommentInputValue("");
      inputRef.current.blur();
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

  function handlePostComment(e) {
    e.preventDefault();
    const normalizedData = commentInputValue.trim();
    if (!normalizedData) return;
    addCommentMutation.mutate(normalizedData);
  }

  return (
    <AnimatePresence mode="wait">
      {commentsQuery.isPending ? (
        <motion.div
          key="loading"
          exit={{ opacity: 0 }}
          transition={FADE_TRANSITION_RULES}
        >
          <Loader />
        </motion.div>
      ) : commentsQuery.isError ? (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={FADE_TRANSITION_RULES}
        >
          <Error />
        </motion.div>
      ) : (
        <motion.div
          key="comments"
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={FADE_TRANSITION_RULES}
        >
          {isAuthenticated ? (
            <form
              className="mb-4 flex w-full items-center justify-center gap-1"
              onSubmit={handlePostComment}
            >
              {/* <InputField
                ref={inputRef}
                placeholder="write smth..."
                value={commentInputValue}
                onChange={handleInputChange}
                maxLength={COMMENT_VALIDATION_RULES.max}
              /> */}
              <Btn type="submit" disabled={addCommentMutation.isPending}>
                Post
              </Btn>
            </form>
          ) : (
            <div className="my-4 text-center">
              <Btn variant="text" onClick={signIn}>
                Login via Google
              </Btn>{" "}
              <p>to leave yout comment</p>
            </div>
          )}

          {commentsQuery.data.pages.flat().map((comment) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...FADE_TRANSITION_RULES, delay: 0.3 }}
              key={comment.id}
              className="my-4 flex w-full max-w-md flex-col gap-1 px-6 lg:px-12"
            >
              <p className="text-palette-lightgray text-xs">
                {comment.user_name}
              </p>
              <p className="text-sm">{comment.content}</p>
              <p className="text-palette-lightgray text-right text-xs">
                {formatDate(comment.created_at)}
              </p>
            </motion.div>
          ))}

          <motion.div layout="position" transition={MOTION_TRANSITION_RULES}>
            <Btn
              onClick={loadMore}
              disabled={
                !commentsQuery.hasNextPage || commentsQuery.isFetchingNextPage
              }
            >
              load more
            </Btn>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
