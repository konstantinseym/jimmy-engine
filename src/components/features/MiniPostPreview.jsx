import AppLink from "../UI/AppLink";
import TagLabel from "../UI/TagLabel";
import TimeStamp from "../UI/TimeStamp";
import MiniLike from "../UI/svg/MiniLike";
import MiniComment from "../UI/svg/MiniComment";
import { motion } from "motion/react";

export default function MiniPostPreview({ postData }) {
  return (
    <article className="border-palette-white/5 relative mx-4 my-4 flex flex-col overflow-hidden rounded-4xl border bg-linear-to-br from-black/5 to-black/1 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)]">
      <div className="inset-0 z-10 flex flex-col justify-around gap-12 p-8">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex gap-2">
            {postData.tags.map((tag, index) => (
              <TagLabel key={index} label={tag} />
            ))}
          </div>
          <TimeStamp time={postData.created_at} />
        </div>

        <div className="flex flex-col gap-2">
          <AppLink to={"/posts/" + postData.id}>
            <h3>{postData.title}</h3>
          </AppLink>

          <p className="text-text-muted">{postData.excerpt}</p>
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <span className="text-md">{postData.comments_count}</span>
          <MiniComment width="18" />
          <p className="text-text-muted text-2xl">|</p>
          <span className="text-md">{postData.likes_count}</span>
          <MiniLike width="18" />
        </div>
      </div>
      <motion.div
        key={"lastPost" + postData.id}
        animate={{
          scale: [1, 1.08, 0.95, 1],
          y: [0, -20, 20, 0],
          x: [0, 15, -15, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.75, 1],
        }}
        className="absolute"
      >
        <img
          className="aspect-square w-full object-cover opacity-10"
          src={postData.image_url}
        />
      </motion.div>
    </article>
  );
}
