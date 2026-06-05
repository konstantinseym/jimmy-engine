import Btn from "../../UI/Btn";
import PostPreview from "../../features/PostPreview";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef } from "react";
import { getLatestPosts } from "../../../api/postsApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";
import { motion } from "motion/react";
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

  if (postsQuery.isLoading) {
    return (
      <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
        <SectionHeader>{SECTION_TITLE}</SectionHeader>
        <Loader />
      </section>
    );
  }

  if (postsQuery.isError) {
    return (
      <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
        <SectionHeader>{SECTION_TITLE}</SectionHeader>
        <Error />
      </section>
    );
  }

  return (
    <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>

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
          disabled={!postsQuery.hasNextPage || postsQuery.isFetchingNextPage}
        >
          Load more
        </Btn>
      </motion.div>
    </section>
  );
});

export default LatestPostsSection;
