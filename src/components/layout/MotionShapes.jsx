import { motion } from "motion/react";

export default function MotionShapes() {
  return (
    <div>
      <motion.div
        className="absolute right-0 z-20"
        animate={{ scale: [1.5, 2, 1.5, 2, 1.5], y: [0, -120, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="601"
          height="568"
          viewBox="0 0 601 568"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="360" cy="208" r="360" fill="url(#paint0_radial_1_1)" />
          <defs>
            <radialGradient
              id="paint0_radial_1_1"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(360 208) rotate(90) scale(360)"
            >
              <stop stopColor="#A85A11" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-75 -left-75 z-10"
        animate={{
          scale: [1.5, 2.5, 1.5],
          x: [0, 300, 200, 300, 0],
          y: [0, -250, -30, -280, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="720"
          height="729"
          viewBox="0 0 720 729"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="360"
            cy="364.5"
            rx="360"
            ry="364.5"
            fill="url(#paint0_radial_1_3)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_1_3"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(360 364.5) rotate(90) scale(364.5 360)"
            >
              <stop stopOpacity="0" />
              <stop offset="0.322115" stopColor="#345148" stopOpacity="0.28" />
              <stop offset="0.591346" stopColor="#3D2915" stopOpacity="0.5" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
