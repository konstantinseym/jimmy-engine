import Btn from "./Btn";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import { FADE_TRANSITION_RULES } from "../../config/motion.config";

export default function ModalAlert({ isOpen, handleClose, message }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={FADE_TRANSITION_RULES}
          className="fixed inset-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-lg"
        >
          <div className="bg-palette-faded m-6 flex max-w-md flex-col items-center justify-between gap-6 rounded-lg p-6">
            <p className="text-center">{message}</p>
            <Btn onClick={handleClose}>OK</Btn>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
