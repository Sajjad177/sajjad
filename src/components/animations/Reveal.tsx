"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionTokens, revealTransition } from "@/config/animation";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  scale?: boolean;
}>;

export const Reveal = ({ children, className, delay = 0, scale = false }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : motionTokens.revealDistance, scale: scale && !reduceMotion ? 0.98 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
};
