"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { ORB_PULSE_SECONDS } from "@/constants";
import type { OrbPosition, ThemeAtmosphere } from "@/types";

type OrbLayerProps = {
  isNight: boolean;
  orbPosition: OrbPosition;
  shouldReduceMotion: boolean;
  themeVisuals: ThemeAtmosphere;
};

export const OrbLayer = memo(function OrbLayer({
  isNight,
  orbPosition,
  shouldReduceMotion,
  themeVisuals,
}: OrbLayerProps) {
  const orbStyle = useMemo(
    () => ({
      left: `${orbPosition.x}%`,
      top: `${orbPosition.y}%`,
      boxShadow: themeVisuals.orbShadow,
      background: themeVisuals.orb,
      opacity: themeVisuals.orbOpacity,
    }),
    [orbPosition.x, orbPosition.y, themeVisuals]
  );

  return (
    <motion.div
      className="absolute h-20 w-20 rounded-full md:h-28 md:w-28"
      style={orbStyle}
      initial={false}
      animate={
        shouldReduceMotion
          ? { opacity: themeVisuals.orbOpacity }
          : {
              x: "-50%",
              y: "-50%",
              scale: isNight ? [1, 1.03, 1] : [1, 1.025, 1],
              opacity: themeVisuals.orbOpacity,
            }
      }
      transition={{
        duration: ORB_PULSE_SECONDS,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {isNight && (
        <motion.span
          className="absolute right-2 top-2 h-20 w-20 rounded-full"
          animate={{ backgroundColor: themeVisuals.moonCutoutColor }}
          transition={{ duration: 3.5, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
});
