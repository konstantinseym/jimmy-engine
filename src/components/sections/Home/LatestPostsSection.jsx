import Btn from "../../UI/Btn";
import Loader from "../../UI/Loader";
import PostPreview from "../../features/PostPreview";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef, useEffect, useState } from "react";
import { fetchLatestPosts } from "../../../api/postsApi";
import { AnimatePresence, motion } from "motion/react";
import { DEFAULT_TRANSITION_RULES } from "../../../config/motion.config";

const SECTION_TITLE = "Latest posts";

const LatestPostsSection = forwardRef(function LatestPostsSection(props, ref) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  function handleLoadMore() {
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

      <AnimatePresence>
        {!latestPosts.length ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={DEFAULT_TRANSITION_RULES}
          >
            {latestPosts.map((post) => (
              <PostPreview key={post.id} postData={post} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Btn onClick={handleLoadMore} disabled={isLoading || !hasMore}>
        Load more
      </Btn>
    </section>
  );
});

export default LatestPostsSection;
