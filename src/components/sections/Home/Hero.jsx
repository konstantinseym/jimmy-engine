import { forwardRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { getContent } from "../../../api/contentApi";

const HERO_IMAGE_PATH =
  "https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/layout/001.png";

const STATISTICS = [
  { id: "posts", count: 3 },
  { id: "comments", count: 12 },
  { id: "likes", count: 34 },
];

const parentVariants = {
  hidden: "",
  visible: {
    transition: { delayChildren: 0.33, staggerChildren: 0.33 },
  },
};

const childrenVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: [0, 1] },
  transition: { duration: 10 },
};

const Hero = forwardRef(function Hero(props, ref) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function loadContent() {
      const data = await getContent();
      setContent(data);
    }

    loadContent();
  });

  return (
    <>
      {content && (
        <header
          ref={ref}
          {...props}
          className="mx-auto flex h-screen w-full max-w-7xl items-center gap-16 py-32"
        >
          <motion.div
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-8"
          >
            <div className="flex-1">
              <motion.img
                variants={childrenVariants}
                src={HERO_IMAGE_PATH}
                className="h-auto w-auto rounded-4xl"
              />
            </div>

            <div className="flex flex-1 flex-col items-start justify-between py-8">
              <motion.p
                variants={childrenVariants}
                className="text-palette-green"
              >
                PERSONAL BLOG
              </motion.p>
              <motion.h1
                variants={childrenVariants}
                className="text-6xl font-semibold"
              >
                {content.title}
              </motion.h1>
              <motion.h2
                variants={childrenVariants}
                className="text-palette-lightgray text-xl"
              >
                {content.subtitle}
              </motion.h2>
              <div className="mt-8 flex w-full justify-around">
                {STATISTICS.map((item) => (
                  <motion.div
                    variants={childrenVariants}
                    key={item.id}
                    className="flex flex-col items-center"
                  >
                    <h3 className="text-4xl">{item.count}</h3>
                    <p>{item.id}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </header>
      )}
    </>
  );
});

export default Hero;
