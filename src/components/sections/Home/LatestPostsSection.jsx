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

  useEffect(() => {
    async function loadPosts() {
      const data = await fetchLatestPosts();
      setLatestPosts(data);
    }

    loadPosts();
  }, []);

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

      <Btn>Load more</Btn>
    </section>
  );
});

export default LatestPostsSection;
