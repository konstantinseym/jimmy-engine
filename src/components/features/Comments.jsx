import { addComment, getComments } from "../../api/postsApi";
import { useState, useRef } from "react";
import Button from "../UI/Button";
import Send from "../UI/svg/Send";
import { useInView } from "react-intersection-observer";
import { formatDate } from "../../utils/formatDate";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import { AnimatePresence, motion } from "motion/react";
import { FADE_TRANSITION_RULES } from "../../config/motion.config";
import { useAuth } from "../../context/authContext";
import { COMMENT_VALIDATION_RULES } from "../../utils/validationRules";
import { validateComment } from "../../utils/validateInput";

import LoginButton from "../UI/LoginButton";

export default function Comments({ postId }) {
  const { isAuthenticated, user } = useAuth();

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

  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    onChange: (inView) => {
      if (
        inView &&
        commentsQuery.hasNextPage &&
        !commentsQuery.isFetchingNextPage
      ) {
        commentsQuery.fetchNextPage();
      }
    },
  });

  function handleInputChange(e) {
    setCommentInputValue(e.target.value);
  }

  function handlePostComment(e) {
    e.preventDefault();
    const validatedComment = validateComment(commentInputValue);
    if (validatedComment) addCommentMutation.mutate(validatedComment);
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
              className="relative mb-4 w-full max-w-xl"
              onSubmit={handlePostComment}
            >
              {user.user_metadata.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt=""
                  className="absolute top-2 left-2 h-8 rounded-full"
                />
              )}

              <input
                ref={inputRef}
                type="text"
                className="text-palette-white focus:border-accent border-accent/50 h-12 w-full rounded-full border px-12 py-3 outline-0 transition"
                placeholder="write smth..."
                value={commentInputValue}
                onChange={handleInputChange}
                maxLength={COMMENT_VALIDATION_RULES.max}
              />
              <div className="absolute top-2 right-2">
                <Button type="submit" disabled={addCommentMutation.isPending}>
                  <Send width="32" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="my-4 text-center">
              <LoginButton />
            </div>
          )}

          {commentsQuery.data.pages.flat().map((comment) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout="position"
              transition={FADE_TRANSITION_RULES}
              key={comment.id}
              className="flex w-full max-w-xl flex-col gap-1 px-6 lg:px-12"
            >
              <p className="text-text-muted text-xs">{comment.user_name}</p>
              <p className="text-sm">{comment.content}</p>
              <p className="text-text-muted text-right text-xs">
                {formatDate(comment.created_at)}
              </p>
            </motion.div>
          ))}

          <div ref={ref} className="min-h-12">
            <AnimatePresence mode="wait">
              {commentsQuery.isFetchingNextPage && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ ...FADE_TRANSITION_RULES, delay: 1 }}
                >
                  <Loader />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
