"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/config/animation";

type HoverScaleProps = PropsWithChildren<ComponentProps<typeof motion.div>>;

export const HoverScale = ({ children, ...props }: HoverScaleProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
