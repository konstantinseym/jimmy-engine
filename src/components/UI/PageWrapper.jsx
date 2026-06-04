import { motion } from "motion/react";
import { FADE_TRANSITION_RULES } from "../../config/motion.config";

export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={FADE_TRANSITION_RULES}
    >
      {children}
    </motion.div>
  );
}
