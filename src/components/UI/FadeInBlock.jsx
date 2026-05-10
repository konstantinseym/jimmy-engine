import { motion } from "motion/react";
import { SLOW_TRANSITION_RULES } from "../../config/motion.config";

export default function FadeInBlock({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-30%" }}
      transition={SLOW_TRANSITION_RULES}
    >
      {children}
    </motion.div>
  );
}
