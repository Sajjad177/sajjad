"use client";

import { motion } from "framer-motion";

type ProcessMarqueeProps = {
  isHovered: boolean;
  onHoverChange: (isHovered: boolean) => void;
};

export const ProcessMarquee = ({ isHovered, onHoverChange }: ProcessMarqueeProps) => (
  <div
    className="relative py-10 mt-28 border-y border-zinc-200 dark:border-neutral-800 overflow-hidden cursor-default group"
    onMouseEnter={() => onHoverChange(true)}
    onMouseLeave={() => onHoverChange(false)}
  >
    <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10" />
    <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10" />
    <motion.div
      animate={{ x: "-50%" }}
      transition={{
        duration: isHovered ? 18 : 35,
        repeat: Infinity,
        ease: "linear",
      }}
      className="flex whitespace-nowrap gap-16 items-center"
    >
      {[...Array(8)].map((_, index) => (
        <h3 key={index} className="text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_white] opacity-20 group-hover:opacity-60 leading-none transition-all duration-300">
          <span className="relative">
            PLAN
            <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
          </span>
          <span className="mx-6 text-primary/30">•</span>
          <span>BUILD</span>
          <span className="mx-6 text-primary/30">•</span>
          <span>TEST</span>
          <span className="mx-6 text-primary/30">•</span>
          <span>LAUNCH</span>
          <span className="mx-6 text-primary/30">•</span>
          <span>GROW</span>
          <span className="ml-6 text-primary/30">•</span>
        </h3>
      ))}
    </motion.div>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
  </div>
);
