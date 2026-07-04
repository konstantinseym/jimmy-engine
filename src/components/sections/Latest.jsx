import Button from "../UI/Button";
import PostPreview from "../features/PostPreview";
import SectionHeader from "../UI/SectionHeader";
import { forwardRef } from "react";
import { getLatestPosts } from "../../api/postsApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../UI/Loader";
import Error from "../UI/Error";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FADE_TRANSITION_RULES } from "../../config/motion.config";

const SECTION_TITLE = "Latest";

const Latest = forwardRef(function Latest(props, ref) {
  const navigate = useNavigate();

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getLatestPosts(),
  });

  return (
    <section
      ref={ref}
      {...props}
      className="mx-auto min-h-screen w-full max-w-7xl pt-32"
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
            <PostPreview
              expanded={true}
              key={postsQuery.data[0].id}
              postData={postsQuery.data[0]}
            />

            {postsQuery.data.length > 1 ? (
              <div className="flex flex-col lg:flex-row">
                <PostPreview
                  key={postsQuery.data[1].id}
                  postData={postsQuery.data[1]}
                />

                {postsQuery.data.length > 2 ? (
                  <PostPreview
                    key={postsQuery.data[2].id}
                    postData={postsQuery.data[2]}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}

            <div className="my-12 text-center">
              <Button onClick={() => navigate("/posts")}>View all</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default Latest;
