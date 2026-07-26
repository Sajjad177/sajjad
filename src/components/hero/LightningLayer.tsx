"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { ThemeAtmosphere } from "@/types";

type LightningLayerProps = {
  themeVisuals: ThemeAtmosphere;
};

export const LightningLayer = memo(function LightningLayer({
  themeVisuals,
}: LightningLayerProps) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ background: themeVisuals.lightning }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.12, 0.03, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 31,
        ease: "easeOut",
      }}
    />
  );
});
