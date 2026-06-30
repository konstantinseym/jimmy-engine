import { forwardRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getMeta } from "../../../api/contentApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../UI/Loader";
import Error from "../../UI/Error";
import MotionShapes from "../../layout/MotionShapes";
import { FADE_TRANSITION_RULES } from "../../../config/motion.config";
import GlassContainer from "../../UI/GlassContainer";

const HERO_IMAGE_PATH =
  "https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/layout/001.png";

const parentVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.33, staggerChildren: 0.125 },
  },
};

const childrenVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const Hero = forwardRef(function Hero(props, ref) {
  const metaQuery = useQuery({
    queryKey: ["meta"],
    queryFn: () => getMeta(),
  });

  return (
    <AnimatePresence mode="wait">
      {metaQuery.isPending ? (
        <motion.header
          key="loader"
          className="flex min-h-screen items-center"
          exit={{ opacity: 0 }}
          transition={FADE_TRANSITION_RULES}
        >
          <Loader />
        </motion.header>
      ) : metaQuery.isError ? (
        <motion.header
          key="error"
          className="flex min-h-screen items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={FADE_TRANSITION_RULES}
        >
          <Error />
        </motion.header>
      ) : (
        <motion.header
          key="header"
          ref={ref}
          {...props}
          className="relative pt-10 lg:pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={FADE_TRANSITION_RULES}
        >
          {/* WRAPPER FOR ANIMATED BG */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <MotionShapes />
          </div>

          {/* WRAPPER FOR HERO CONTENT */}
          <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center">
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
              className="mx-4 flex flex-col lg:flex-row lg:gap-12"
            >
              {/* FLEXBOX HERO CONTENT */}
              <div className="relative flex flex-1 items-center justify-center">
                <motion.img
                  variants={childrenVariants}
                  src={HERO_IMAGE_PATH}
                  className="h-auto max-h-screen w-auto rounded-4xl"
                />
                <motion.div
                  variants={childrenVariants}
                  className="absolute bottom-5 left-7"
                >
                  <GlassContainer addClassName="py-2 pr-8 pl-4 text-sm rounded-full">
                    <p className="text-text-muted">status:</p>
                    <p>{metaQuery.data.status}</p>
                  </GlassContainer>
                </motion.div>
              </div>

              <div className="flex flex-1 flex-col items-start gap-2 px-4 py-8 lg:justify-between">
                <motion.p variants={childrenVariants} className="text-accent">
                  PERSONAL BLOG
                </motion.p>
                <motion.p
                  variants={childrenVariants}
                  className="text-3xl font-semibold lg:text-6xl"
                >
                  {metaQuery.data.title}
                </motion.p>
                <motion.h1
                  variants={childrenVariants}
                  className="text-text-muted text-md lg:text-xl"
                >
                  {metaQuery.data.subtitle}
                </motion.h1>
                <div className="mt-8 flex w-full justify-around">
                  <motion.div
                    variants={childrenVariants}
                    className="flex flex-col items-center gap-1"
                  >
                    <h3 className="text-4xl">{metaQuery.data.posts}</h3>
                    <p>posts</p>
                  </motion.div>
                  <motion.div
                    variants={childrenVariants}
                    className="flex flex-col items-center gap-1"
                  >
                    <h3 className="text-4xl">{metaQuery.data.comments}</h3>
                    <p>comments</p>
                  </motion.div>
                  <motion.div
                    variants={childrenVariants}
                    className="flex flex-col items-center gap-1"
                  >
                    <h3 className="text-4xl">{metaQuery.data.likes}</h3>
                    <p>likes</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
});

export default Hero;
