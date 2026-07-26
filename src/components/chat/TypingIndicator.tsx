"use client";

import { motion } from "framer-motion";

const delays = [0, 0.2, 0.4];

export const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-white dark:bg-[#1a1a1a] border border-zinc-100 dark:border-zinc-800 self-start rounded-[1.5rem] rounded-tl-sm px-5 py-4 flex items-center gap-1.5 shadow-sm"
  >
    {delays.map((delay) => (
      <motion.div
        key={delay}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, delay }}
        className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full"
      />
    ))}
  </motion.div>
);
