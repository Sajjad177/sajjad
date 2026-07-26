"use client";

import { AnimatePresence, motion } from "framer-motion";
import { THEME_TRANSITION_SECONDS } from "@/constants";

type ThemeCrossfadeLayerProps = {
  id: string;
  background: string;
};

export const ThemeCrossfadeLayer = ({
  id,
  background,
}: ThemeCrossfadeLayerProps) => (
  <AnimatePresence mode="popLayout">
    <motion.div
      key={id}
      className="absolute inset-0"
      style={{ background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: THEME_TRANSITION_SECONDS, ease: "easeOut" }}
    />
  </AnimatePresence>
);
