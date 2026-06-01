import Btn from "../../UI/Btn";
import Loader from "../../UI/Loader";
import PostPreview from "../../features/PostPreview";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef, useEffect, useState } from "react";
import { fetchLatestPosts } from "../../../api/postsApi";
import { motion } from "motion/react";
import {
  LAYOUT_TRANSITION_RULES,
  SLOW_TRANSITION_RULES,
} from "../../../config/motion.config";

const SECTION_TITLE = "Latest posts";

const LatestPostsSection = forwardRef(function LatestPostsSection(props, ref) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    async function loadPosts(page) {
      setIsLoading(true);
      const data = await fetchLatestPosts(page);

      if (data.length > 0) {
        setLatestPosts((prev) => [...prev, ...data]);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }

    loadPosts(page);
  }, [page]);

  return (
    <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>

      {!latestPosts.length ? (
        <Loader key="loader" />
      ) : (
        <motion.div
          className="flex flex-col items-center"
          layout
          transition={LAYOUT_TRANSITION_RULES}
        >
          {latestPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={SLOW_TRANSITION_RULES}
            >
              <PostPreview postData={post} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="text-center 2xl:text-left">
        <Btn onClick={loadMore} disabled={isLoading || !hasMore}>
          Load more
        </Btn>
      </div>
    </section>
  );
});

export default LatestPostsSection;
