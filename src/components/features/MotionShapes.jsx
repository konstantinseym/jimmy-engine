import { motion } from "motion/react";

export default function MotionShapes() {
  return (
    <div>
      <motion.div
        className="absolute top-0 right-0"
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 40, -80, 0],
          scale: [1, 1.3, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        <svg
          className="h-[200vh] min-h-180 w-[200vw] min-w-180"
          viewBox="0 0 720 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="360" cy="360" r="360" fill="url(#paint0_radial_2_2)" />
          <defs>
            <radialGradient
              id="paint0_radial_2_2"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(360 360) rotate(90) scale(360)"
            >
              <stop stopColor="#392D33" />
              <stop offset="1" stopColor="#392D33" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0"
        animate={{
          x: [0, -60, 80, -40, 0],
          y: [0, 40, -80, 60, 0],
          scale: [1, 0.7, 1.4, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.5, 0.7, 1],
          delay: 3,
        }}
      >
        <svg
          className="h-[200vh] min-h-180 w-[200vw] min-w-180"
          viewBox="0 0 720 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="360" cy="360" r="360" fill="url(#paint0_radial_1_3)" />
          <defs>
            <radialGradient
              id="paint0_radial_1_3"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(360 360) rotate(90) scale(360)"
            >
              <stop stopColor="#5E5531" />
              <stop offset="1" stopColor="#5E5531" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
