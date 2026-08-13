import type { Transition, Variants } from "framer-motion";

export const motionTokens = {
  duration: {
    fast: 0.18,
    normal: 0.35,
    reveal: 0.55,
  },
  stagger: 0.08,
  revealDistance: 24,
  ease: [0.22, 1, 0.36, 1],
} as const;

export const revealTransition: Transition = {
  duration: motionTokens.duration.reveal,
  ease: motionTokens.ease,
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: motionTokens.stagger },
  },
};
