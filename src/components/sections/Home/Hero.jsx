import { forwardRef } from "react";
import { motion } from "motion/react";

const HERO_IMAGE_PATH =
  "https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/layout/001.png";
const HERO_MESSAGE = {
  label: "PERSONAL BLOG",
  title: "Notes on building, better digital things.",
  subtitle:
    "Thoughts on web development, design, productivity, and the small systems that make creative work feel less chaotic.",
};
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
  return (
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
          <motion.p variants={childrenVariants} className="text-palette-green">
            {HERO_MESSAGE.label}
          </motion.p>
          <motion.h1
            variants={childrenVariants}
            className="text-6xl font-semibold"
          >
            {HERO_MESSAGE.title}
          </motion.h1>
          <motion.h2
            variants={childrenVariants}
            className="text-palette-lightgray text-xl"
          >
            {HERO_MESSAGE.subtitle}
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
  );
});

export default Hero;
