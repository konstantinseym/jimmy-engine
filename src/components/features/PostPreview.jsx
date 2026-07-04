import TagLabel from "../UI/TagLabel";
import TimeStamp from "../UI/TimeStamp";

import MiniLike from "../UI/svg/MiniLike";
import MiniComment from "../UI/svg/MiniComment";
import RouterLink from "../UI/RouterLink";

import { motion } from "motion/react";

export default function PostPreview({ postData, expanded = false }) {
  return (
    <article className="border-palette-white/5 relative mx-4 my-4 flex flex-col overflow-hidden rounded-4xl border bg-linear-to-br from-black/5 to-black/1 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] lg:flex-row">
      {expanded ? (
        <div className="z-10 w-full lg:w-1/3">
          <img
            className="aspect-square object-cover grayscale-30"
            src={postData.image_url}
            alt={postData.image_alt}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="z-10 flex flex-col justify-around gap-4 p-8">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex gap-2">
            {postData.tags.map((tag, index) => (
              <TagLabel key={index} label={tag} />
            ))}
          </div>
          <TimeStamp time={postData.created_at} />
        </div>

        <div className="flex flex-col gap-2">
          <RouterLink to={"/posts/" + postData.id}>
            <h3>{postData.title}</h3>
          </RouterLink>

          <p className="text-text-muted">{postData.excerpt}</p>
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <span className="text-md">{postData.comments_count}</span>
          <MiniComment width="18" />
          <span className="text-text-muted text-2xl">|</span>
          <span className="text-md">{postData.likes_count}</span>
          <MiniLike width="18" />
        </div>
      </div>
      <motion.div
        key={"post" + postData.id}
        className={expanded ? "absolute top-1/2 lg:top-0" : "absolute"}
        animate={{
          scale: [1.5, 1.6, 1.4, 1.5],
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
      >
        <img
          className="aspect-square w-full object-cover opacity-20"
          src={postData.image_url}
        />
      </motion.div>
    </article>
  );
}
