import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import BtnAsText from "../components/UI/BtnAsText";
import { getOnePost } from "../api/postsApi";
import { useNavigate } from "react-router-dom";
import TagLabel from "../components/UI/TagLabel";
import { formatDate } from "../utils/formatDate";
import { AnimatePresence, motion } from "motion/react";
import { FADE_TRANSITION_RULES } from "../config/motion.config";
import Loader from "../components/UI/Loader";
import PostComments from "../components/layout/PostComments";
import PageWrapper from "../components/UI/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import PostContent from "../components/features/PostContent";
import AppLink from "../components/UI/AppLink";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => getOnePost(id),
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  function navigateBack() {
    navigate(-1);
  }

  return (
    <PageWrapper>
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
            <Loader />
          </motion.div>
        ) : (
          <motion.main
            key="post"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={FADE_TRANSITION_RULES}
            className="mx-auto w-full max-w-7xl px-6 py-16"
          >
            <div className="mb-10">
              <BtnAsText onClick={navigateBack}>← Back</BtnAsText>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                {postQuery.data.tags.map((tag, index) => (
                  <TagLabel key={index} label={tag} />
                ))}
              </div>
              <span className="text-palette-green">
                {formatDate(postQuery.data.created_at)}
              </span>
              <h1 className="py-6 text-3xl">{postQuery.data.title}</h1>
              <img
                className="aspect-square rounded-lg object-cover lg:aspect-5/2"
                src={postQuery.data.image_url}
                alt={postQuery.data.image_alt}
              />
              <div className="my-12 lg:mr-36 lg:ml-24">
                <PostContent content={postQuery.data.content} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {postQuery.data.previous_post && (
                <AppLink to={"/posts/" + postQuery.data.previous_post.id}>
                  Previous post: {postQuery.data.previous_post.title}
                </AppLink>
              )}

              {postQuery.data.next_post && (
                <AppLink to={"/posts/" + postQuery.data.next_post.id}>
                  Next post: {postQuery.data.next_post.title}
                </AppLink>
              )}
            </div>

            <PostComments postId={id} />
          </motion.main>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
