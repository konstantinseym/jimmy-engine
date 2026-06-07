import Btn from "../../UI/Btn";
import PostPreview from "../../features/PostPreview";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef } from "react";
import { getLatestPosts } from "../../../api/postsApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";
import { AnimatePresence, motion } from "motion/react";
import {
  FADE_TRANSITION_RULES,
  MOTION_TRANSITION_RULES,
} from "../../../config/motion.config";

const SECTION_TITLE = "Latest posts";

const LatestPostsSection = forwardRef(function LatestPostsSection(props, ref) {
  const postsQuery = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getLatestPosts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });

  function loadMore() {
    postsQuery.fetchNextPage();
  }

  return (
    <section
      ref={ref}
      {...props}
      className="mx-auto min-h-92 w-full max-w-7xl py-16"
    >
      <SectionHeader>{SECTION_TITLE}</SectionHeader>

      <AnimatePresence mode="wait">
        {postsQuery.isPending ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            transition={FADE_TRANSITION_RULES}
          >
            <Loader />
          </motion.div>
        ) : postsQuery.isError ? (
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
            key="posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={FADE_TRANSITION_RULES}
          >
            {postsQuery.data.pages.flat().map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...FADE_TRANSITION_RULES, delay: 0.3 }}
              >
                <PostPreview postData={post} />
              </motion.div>
            ))}

            <motion.div
              layout="position"
              transition={MOTION_TRANSITION_RULES}
              className="text-center"
            >
              <Btn
                onClick={loadMore}
                disabled={
                  !postsQuery.hasNextPage || postsQuery.isFetchingNextPage
                }
              >
                Load more
              </Btn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default LatestPostsSection;
