import { addComment, getComments } from "../../api/postsApi";
import { useState, useRef } from "react";
import Btn from "../UI/Btn";
import InputField from "../UI/InputField";
import { COMMENT_VALIDATION_RULES } from "../../utils/validationRules";
import { formatDate } from "../../utils/formatDate";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Loader from "../UI/Loader";
import Error from "../UI/Error";

export default function PostComments({ postId }) {
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

  if (commentsQuery.isLoading) {
    return <Loader />;
  }

  if (commentsQuery.isError) {
    return <Error />;
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
        <Btn type="submit" disabled={addCommentMutation.isPending}>
          Post
        </Btn>
      </form>

      {commentsQuery.data.pages.flat().map((comment) => (
        <div
          className="my-4 flex w-full max-w-md flex-col gap-1 px-6 lg:px-12"
          key={comment.id}
        >
          <p className="text-sm">{comment.content}</p>
          <p className="text-palette-lightgray text-right text-xs">
            {formatDate(comment.created_at)}
          </p>
        </div>
      ))}
      <Btn
        onClick={loadMore}
        disabled={
          !commentsQuery.hasNextPage || commentsQuery.isFetchingNextPage
        }
      >
        load more
      </Btn>
    </div>
  );
}
