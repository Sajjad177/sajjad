"use client";

import { memo, useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import { ORB_PULSE_SECONDS } from "@/constants";
import type { MotionValue } from "framer-motion";
import type { OrbPosition, ThemeAtmosphere } from "@/types";

type OrbLayerProps = {
  isNight: boolean;
  orbPosition: OrbPosition;
  scrollProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
  themeVisuals: ThemeAtmosphere;
};

export const OrbLayer = memo(function OrbLayer({
  isNight,
  orbPosition,
  scrollProgress,
  shouldReduceMotion,
  themeVisuals,
}: OrbLayerProps) {
  const orbY = useTransform(scrollProgress, [0, 1], [0, isNight ? -94 : 185]);
  const orbOpacity = useTransform(
    scrollProgress,
    [0, 0.58, 0.86, 1],
    [themeVisuals.orbOpacity, themeVisuals.orbOpacity * 0.76, themeVisuals.orbOpacity * 0.28, 0]
  );
  const orbFilter = useTransform(
    scrollProgress,
    [0, 1],
    ["saturate(1) blur(0px)", "saturate(0.58) blur(2px)"]
  );
  const glowOpacity = useTransform(
    scrollProgress,
    [0, 0.66, 1],
    [
      isNight ? themeVisuals.orbOpacity * 0.38 : themeVisuals.orbOpacity * 0.5,
      isNight ? themeVisuals.orbOpacity * 0.18 : themeVisuals.orbOpacity * 0.24,
      0,
    ]
  );
  const moonVeilOpacity = useTransform(scrollProgress, [0.28, 0.7, 1], [0, 0.46, 0.9]);
  const moonVeilY = useTransform(scrollProgress, [0, 1], [32, -12]);
  const orbStyle = useMemo(
    () => ({
      left: `${orbPosition.x}%`,
      top: `${orbPosition.y}%`,
    }),
    [orbPosition.x, orbPosition.y]
  );

  return (
    <motion.div
      className="absolute h-20 w-20 md:h-28 md:w-28"
      style={{ ...orbStyle, y: orbY, opacity: orbOpacity, filter: orbFilter }}
      initial={false}
    >
      <motion.div
        className="relative h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: themeVisuals.orb,
          boxShadow: themeVisuals.orbShadow,
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: isNight ? [1, 1.03, 1] : [1, 1.025, 1],
              }
        }
        transition={{
          duration: ORB_PULSE_SECONDS,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.span
          className="absolute inset-[-38%] rounded-full blur-2xl"
          initial={false}
          style={{ opacity: glowOpacity }}
          animate={{
            background: isNight
              ? "radial-gradient(circle, rgba(219,231,250,0.46), rgba(180,200,230,0.16) 42%, transparent 72%)"
              : "radial-gradient(circle, rgba(255,232,156,0.58), rgba(255,177,73,0.18) 44%, transparent 76%)",
          }}
          transition={{ duration: 3.5, ease: "easeOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            background: isNight
              ? "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.9), rgba(232,237,244,0.42) 22%, transparent 48%)"
              : "radial-gradient(circle at 32% 27%, rgba(255,255,236,0.96), rgba(255,245,183,0.34) 24%, transparent 52%)",
          }}
          transition={{ duration: 3.5, ease: "easeOut" }}
        />
        <motion.span
          className="absolute inset-[6%] rounded-full opacity-70"
          initial={false}
          animate={{
            boxShadow: isNight
              ? "inset -12px -16px 24px rgba(117,130,158,0.22), inset 8px 8px 18px rgba(255,255,255,0.12)"
              : "inset -12px -16px 24px rgba(214,117,24,0.22), inset 8px 8px 18px rgba(255,255,255,0.2)",
          }}
          transition={{ duration: 3.5, ease: "easeOut" }}
        />
        {isNight && (
          <>
            <motion.span
              className="absolute right-2 top-2 h-20 w-20 rounded-full md:h-28 md:w-28"
              animate={{ backgroundColor: themeVisuals.moonCutoutColor }}
              transition={{ duration: 3.5, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-x-[-72%] top-[8%] h-[62%] rounded-full blur-md"
              style={{
                y: moonVeilY,
                opacity: moonVeilOpacity,
                backgroundColor: themeVisuals.cloudColor,
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
});
