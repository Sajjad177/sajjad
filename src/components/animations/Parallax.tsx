"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxProps = PropsWithChildren<
  ComponentProps<typeof motion.div> & { distance?: number }
>;

export const Parallax = ({ children, distance = 20, ...props }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : distance, reduceMotion ? 0 : -distance]);

  return <motion.div ref={ref} {...props} style={{ ...props.style, y }}>{children}</motion.div>;
};
