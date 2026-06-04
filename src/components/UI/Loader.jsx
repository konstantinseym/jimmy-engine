import { motion } from "motion/react";

const DOTS = [0, 1, 2];

export default function Loader() {
  return (
    <div className="flex w-full justify-center py-4">
      <div className="flex items-center gap-2">
        {DOTS.map((dot) => (
          <motion.div
            key={dot}
            className="bg-palette-green h-2 w-2 rounded-full"
            animate={{
              scale: [1, 0.5],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: dot * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
