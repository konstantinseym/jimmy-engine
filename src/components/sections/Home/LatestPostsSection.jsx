import Btn from "../../UI/Btn";
import PostPreview from "../../features/PostPreview";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef } from "react";
import { getLatestPosts } from "../../../api/postsApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";
import { AnimatePresence, motion } from "motion/react";
import { FADE_TRANSITION_RULES } from "../../../config/motion.config";

const SECTION_TITLE = "Latest posts";

const LatestPostsSection = forwardRef(function LatestPostsSection(props, ref) {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getLatestPosts(),
  });

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
            {postsQuery.data.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...FADE_TRANSITION_RULES, delay: 0.3 }}
              >
                <PostPreview postData={post} />
              </motion.div>
            ))}
            <Btn>View all</Btn>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default LatestPostsSection;
