import Logo from "../UI/Logo";
import NavLinks from "./NavLinks";
import { useScroll } from "../../hooks/useScroll";
import { AnimatePresence, motion } from "motion/react";
import { MOTION_TRANSITION_RULES } from "../../config/motion.config";

export default function NavBar({ sections, onNavClick }) {
  const isScrolled = useScroll();

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.nav
          key="min"
          className="bg-palette-faded fixed top-0 left-1/2 z-10 mt-8 flex -translate-x-1/2 justify-center rounded-full px-6 py-4 backdrop-blur-xs"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={MOTION_TRANSITION_RULES}
        >
          <NavLinks sections={sections} onNavClick={onNavClick} />
        </motion.nav>
      )}
      {!isScrolled && (
        <motion.nav
          key="max"
          className="fixed top-7 z-10 flex w-full flex-col items-center gap-4 lg:top-0 lg:left-1/2 lg:max-w-7xl lg:-translate-x-1/2 lg:flex-row lg:justify-between lg:px-12 lg:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={MOTION_TRANSITION_RULES}
        >
          <Logo />
          <NavLinks sections={sections} onNavClick={onNavClick} />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
