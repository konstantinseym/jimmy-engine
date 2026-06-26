import Logo from "../UI/Logo";
import { AnimatePresence, motion } from "motion/react";
import { MOTION_TRANSITION_RULES } from "../../config/motion.config";
import AuthStatus from "../features/AuthStatus";
import GlassContainer from "../UI/GlassContainer";
// import { useNavbarVisible } from "../../hooks/useNavbarVisible";

export default function NavBar({ children }) {
  // const isVisible = useNavbarVisible();

  return (
    <AnimatePresence>
      <motion.nav
        className="fixed top-7 left-0 z-20 w-full"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={MOTION_TRANSITION_RULES}
      >
        <GlassContainer addClassName="mx-4 flex flex-col items-center gap-3 px-12 py-4 lg:mx-auto lg:max-w-6xl lg:flex-row lg:justify-between">
          <div className="hidden lg:block">
            <Logo />
          </div>
          {children}
          <AuthStatus />
        </GlassContainer>
      </motion.nav>
    </AnimatePresence>
  );
}
