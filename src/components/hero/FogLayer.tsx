"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { COLOR_TRANSITION, FOG_FADE_SECONDS, FOG_SEEDS } from "@/constants";
import type { EnvironmentVisualProps } from "@/types";

type FogLayerProps = Pick<
  EnvironmentVisualProps,
  "shouldReduceMotion" | "themeVisuals"
>;

export const FogLayer = memo(function FogLayer({
  shouldReduceMotion,
  themeVisuals,
}: FogLayerProps) {
  return (
    <motion.div
      className="absolute inset-0 hidden sm:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: themeVisuals.fogOpacity }}
      transition={{ duration: FOG_FADE_SECONDS, ease: "easeOut" }}
    >
      {FOG_SEEDS.map((fog) => (
        <motion.span
          key={fog.id}
          className="absolute left-[-20%] h-20 w-[140%] rounded-full blur-3xl"
          style={{
            top: fog.top,
            backgroundColor: themeVisuals.fogColor,
            transition: COLOR_TRANSITION,
          }}
          initial={{ x: "-8%", opacity: fog.opacity }}
          animate={
            shouldReduceMotion
              ? { x: "0%", opacity: fog.opacity }
              : {
                  x: ["-8%", "8%", "-8%"],
                  opacity: [fog.opacity, fog.opacity * 1.2, fog.opacity],
                }
          }
          transition={{
            duration: fog.duration,
            repeat: Infinity,
            delay: fog.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
});
