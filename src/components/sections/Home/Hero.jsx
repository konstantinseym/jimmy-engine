import { forwardRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { getContent, getStats } from "../../../api/contentApi";

const HERO_IMAGE_PATH =
  "https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/layout/001.png";

const parentVariants = {
  hidden: "",
  visible: {
    transition: { delayChildren: 0.33, staggerChildren: 0.125 },
  },
};

const childrenVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Hero = forwardRef(function Hero(props, ref) {
  const [content, setContent] = useState(null);
  const [stats, setStats] = useState({ posts: 0, comments: 0, likes: 0 });

  useEffect(() => {
    async function loadContent() {
      const contentData = await getContent();
      setContent(contentData);

      const statsData = await getStats();
      setStats(statsData);
    }

    loadContent();
  }, []);

  return (
    <>
      {!content ? (
        <div className="h-screen"></div>
      ) : (
        <header
          ref={ref}
          {...props}
          className="mx-auto flex min-h-screen w-full max-w-7xl items-center pt-24 lg:pt-12"
        >
          <motion.div
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col p-8 lg:flex-row lg:gap-12"
          >
            <div className="flex flex-1 items-center justify-center">
              <motion.img
                variants={childrenVariants}
                src={HERO_IMAGE_PATH}
                className="h-auto max-h-screen w-auto rounded-4xl"
              />
            </div>

            <div className="flex flex-1 flex-col items-start gap-4 py-8 lg:justify-between lg:gap-0">
              <motion.p
                variants={childrenVariants}
                className="text-palette-green"
              >
                PERSONAL BLOG
              </motion.p>
              <motion.h1
                variants={childrenVariants}
                className="text-3xl font-semibold lg:text-6xl"
              >
                {content.title}
              </motion.h1>
              <motion.h2
                variants={childrenVariants}
                className="text-palette-lightgray text-md lg:text-xl"
              >
                {content.subtitle}
              </motion.h2>
              <div className="mt-8 flex w-full justify-around">
                <motion.div
                  variants={childrenVariants}
                  className="flex flex-col items-center"
                >
                  <h3 className="text-4xl">{stats.posts}</h3>
                  <p>posts</p>
                </motion.div>
                <motion.div
                  variants={childrenVariants}
                  className="flex flex-col items-center"
                >
                  <h3 className="text-4xl">{stats.comments}</h3>
                  <p>comments</p>
                </motion.div>
                <motion.div
                  variants={childrenVariants}
                  className="flex flex-col items-center"
                >
                  <h3 className="text-4xl">{stats.likes}</h3>
                  <p>likes</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </header>
      )}
    </>
  );
});

export default Hero;
