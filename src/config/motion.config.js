export const DEFAULT_TRANSITION_RULES = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
};

export const SLOW_TRANSITION_RULES = {
  duration: 1,
  ease: "easeInOut",
};

export const LAYOUT_TRANSITION_RULES = {
  type: "spring",
  stiffness: 350,
  damping: 45,
  mass: 0.8,
};
