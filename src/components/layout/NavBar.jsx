import Logo from "../UI/Logo";
import { AnimatePresence, motion } from "motion/react";
import { MOTION_TRANSITION_RULES } from "../../config/motion.config";
import AuthStatus from "../features/AuthStatus";
import GlassContainer from "../UI/GlassContainer";

export default function NavBar({ children }) {
  return (
    <AnimatePresence>
      <motion.nav
        className="fixed top-0 left-0 z-10 w-full pt-7 pb-3 lg:left-1/2 lg:-translate-x-1/2 lg:px-12 lg:py-9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={MOTION_TRANSITION_RULES}
      >
        <GlassContainer addClassName="mx-4 flex flex-col items-center gap-3 px-8 py-4 lg:mx-auto lg:max-w-7xl lg:flex-row lg:justify-between">
          <Logo />
          {children}
          <AuthStatus />
        </GlassContainer>
      </motion.nav>
    </AnimatePresence>
  );
}
