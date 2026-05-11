import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../components/UI/SectionHeader";
import { getOnePost } from "../api/postsApi";
import { Link } from "react-router-dom";
import TagLabel from "../components/UI/TagLabel";
import { formatDate } from "../utils/formatDate";
import { motion } from "motion/react";
import { DEFAULT_TRANSITION_RULES } from "../config/motion.config";
import Loader from "../components/UI/Loader";

export default function Posts() {
  const { id } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    async function loadPost(postId) {
      const data = await getOnePost(postId);
      setPostData(data);
      window.scroll(0, 0)
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
          transition={DEFAULT_TRANSITION_RULES, {delay: 0.3}}
          className="mx-auto w-full max-w-7xl py-32"
        >
          <Link
            to="/"
            className="text-palette-green hover:text-palette-white mb-10 block transition"
          >
            ← Back to main
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {postData.tags.map((tag, index) => (
                <TagLabel key={index} label={tag} />
              ))}
            </div>
            <span className="text-palette-green">
              {formatDate(postData.created_at)}
            </span>
            <SectionHeader>{postData.title}</SectionHeader>
            <img
              className="mx-auto h-full w-full rounded-lg object-cover"
              src={postData.image_url}
              alt={postData.image_alt}
            />
            <div className="my-12 ml-24 w-4xl">
              <p className="text-lg leading-8">{postData.content}</p>
            </div>
          </div>
        </motion.main>
      )}
    </>
  );
}
