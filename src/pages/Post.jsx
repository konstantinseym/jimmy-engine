import { useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/UI/Button";
import { getOnePost } from "../api/postsApi";
import { useNavigate } from "react-router-dom";
import TagLabel from "../components/UI/TagLabel";
import TimeStamp from "../components/UI/TimeStamp";
import { AnimatePresence, motion } from "motion/react";
import { FADE_TRANSITION_RULES } from "../config/motion.config";
import Loader from "../components/UI/Loader";
import Comments from "../components/features/Comments";
import PageWrapper from "../components/UI/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import PostContent from "../components/features/PostContent";
import RouterLink from "../components/UI/RouterLink";
import Like from "../components/UI/Like";
import NavBar from "../components/features/NavBar";
import GlassContainer from "../components/UI/GlassContainer";

export default function Post() {
  const commentsRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => getOnePost(id),
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const navElements = [
    <Button onClick={() => navigate(-1)}>← Back</Button>,
    <Button onClick={() => navigate("/")}>Home</Button>,
    <Button onClick={() => commentsRef.current.scrollIntoView()}>
      Comments
    </Button>,
  ];

  return (
    <PageWrapper>
      <NavBar elements={navElements} />
      <AnimatePresence mode="wait">
        {postQuery.isPending ? (
          <motion.div
            key="loader"
            className="flex min-h-screen items-center"
            exit={{ opacity: 0 }}
            transition={FADE_TRANSITION_RULES}
          >
            <Loader />
          </motion.div>
        ) : postQuery.isError ? (
          <motion.div
            key="error"
            className="flex min-h-screen items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={FADE_TRANSITION_RULES}
          >
            <Error />
          </motion.div>
        ) : (
          <motion.main
            key="post"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={FADE_TRANSITION_RULES}
            className="relative mx-auto w-full max-w-7xl pt-32 pb-8"
          >
            <img
              className="fixed inset-0 -z-10 h-full w-full object-cover opacity-20 blur-md"
              src={postQuery.data.image_url}
              alt={postQuery.data.image_alt}
            />

            <div className="mx-4 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {postQuery.data.tags.map((tag, index) => (
                    <TagLabel key={index} label={tag} />
                  ))}
                </div>
                <TimeStamp time={postQuery.data.created_at} />
              </div>
              <h1 className="mt-4">{postQuery.data.title}</h1>

              <GlassContainer addClassName="lg:mr-36 lg:ml-24 p-5 lg:p-8 rounded-4xl">
                <PostContent content={postQuery.data.content} />
                <div className="mt-4 flex justify-end">
                  <Like postId={postQuery.data.id} />
                </div>
              </GlassContainer>

              <div className="flex flex-col gap-4 py-6 lg:flex-row lg:justify-between">
                {postQuery.data.previous_post ? (
                  <RouterLink to={"/posts/" + postQuery.data.previous_post.id}>
                    Previous: {postQuery.data.previous_post.title}
                  </RouterLink>
                ) : (
                  <div></div>
                )}

                {postQuery.data.next_post && (
                  <RouterLink to={"/posts/" + postQuery.data.next_post.id}>
                    Next: {postQuery.data.next_post.title}
                  </RouterLink>
                )}
              </div>

              <div ref={commentsRef}>
                <Comments postId={id} />
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
