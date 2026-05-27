import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BtnAsText from "../components/UI/BtnAsText";
import { getOnePost } from "../api/postsApi";
import { useNavigate } from "react-router-dom";
import TagLabel from "../components/UI/TagLabel";
import { formatDate } from "../utils/formatDate";
import { motion } from "motion/react";
import { DEFAULT_TRANSITION_RULES } from "../config/motion.config";
import Loader from "../components/UI/Loader";
import PostComments from "../components/layout/PostComments";

export default function Post() {
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function loadPost(postId) {
      const data = await getOnePost(postId);
      setPostData(data);
    }

    loadPost(id);
  }, [id]);

  return (
    <>
      {!postData && (
        <motion.div
          key="loader"
          className="flex min-h-screen items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={DEFAULT_TRANSITION_RULES}
        >
          <Loader />
        </motion.div>
      )}

      {postData && (
        <motion.main
          key="post"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...DEFAULT_TRANSITION_RULES, delay: 0.3 }}
          className="mx-auto w-full max-w-7xl px-6 py-16"
        >
          <div className="mb-10">
            <BtnAsText onClick={() => navigate(-1)}>← Back</BtnAsText>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {postData.tags.map((tag, index) => (
                <TagLabel key={index} label={tag} />
              ))}
            </div>
            <span className="text-palette-green">
              {formatDate(postData.created_at)}
            </span>
            <h3 className="py-6 text-3xl">{postData.title}</h3>
            <div className="aspect-square max-w-xl lg:aspect-auto lg:max-w-4xl">
              <img
                className="mx-auto h-full w-full rounded-lg object-cover"
                src={postData.image_url}
                alt={postData.image_alt}
              />
            </div>
            <div className="my-12 max-w-4xl">
              <p className="text-md leading-8 lg:pl-12 lg:text-lg">
                {postData.content}
              </p>
            </div>
          </div>
          <PostComments />
        </motion.main>
      )}
    </>
  );
}
