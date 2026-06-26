import { useNavigate } from "react-router-dom";

import Btn from "../UI/Btn";
import TagLabel from "../UI/TagLabel";
import TimeStamp from "../UI/TimeStamp";
import MiniLike from "../UI/svg/MiniLike";
import MiniComment from "../UI/svg/MiniComment";
import { motion } from "motion/react";

export default function MiniPostPreview({ postData }) {
  const navigate = useNavigate();

  function openPost() {
    navigate("/posts/" + postData.id);
  }

  return (
    <article className="relative mx-2 my-2 flex flex-col overflow-hidden rounded-4xl border border-white/5 bg-linear-to-br from-black/5 to-black/1 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]">
      <div className="inset-0 z-10 flex flex-col justify-around gap-12 p-8">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            {postData.tags.map((tag, index) => (
              <TagLabel key={index} label={tag} />
            ))}
          </div>
          <TimeStamp time={postData.created_at} />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-3xl">{postData.title}</h3>
          <p className="text-palette-lightgray">{postData.excerpt}</p>
        </div>

        <div className="flex justify-between px-8">
          <div className="flex items-center gap-4">
            <p className="text-xl">{postData.comments_count}</p>
            <MiniComment width="24" />
            <p className="text-palette-lightgray text-2xl">|</p>
            <p className="text-xl">{postData.likes_count}</p>
            <MiniLike width="24" />
          </div>

          <Btn variant="pill" onClick={openPost}>
            Read full
          </Btn>
        </div>
      </div>
      <motion.div
        key={"lastPost" + postData.id}
        animate={{ y: [0, -256, 0] }}
        transition={{
          duration: 144 / (postData.id + 3),
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <img
          className="aspect-square w-full object-cover opacity-5"
          src={postData.image_url}
        />
      </motion.div>
    </article>
  );
}
