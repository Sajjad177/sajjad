"use client";

import { motion } from "framer-motion";

export const ProcessHeader = () => (
  <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between pb-10 md:pb-12 gap-6 relative">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
        How I Work
      </span>
      <h2 className="text-[clamp(40px,8vw,120px)] font-medium tracking-tighter text-black dark:text-white leading-none">
        Process
        <span className="text-primary italic">.</span>
      </h2>
    </motion.div>
    <motion.p
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-[300px] text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-snug font-light"
    >
      A structured, professional approach from initial planning to the final deployment.
    </motion.p>
  </header>
);
