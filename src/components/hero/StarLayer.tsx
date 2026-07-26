"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { STAR_SEEDS } from "@/constants";
import type { EnvironmentVisualProps } from "@/types";

type StarLayerProps = Pick<
  EnvironmentVisualProps,
  "shouldReduceMotion" | "themeVisuals" | "themeMode" | "weatherMotion"
>;

export const StarLayer = memo(function StarLayer({
  shouldReduceMotion,
  themeMode,
  themeVisuals,
  weatherMotion,
}: StarLayerProps) {
  return (
    <div className="hidden sm:block">
      {STAR_SEEDS.map((star, index) => (
        <motion.span
          key={star.id}
          className={`${index > 22 ? "hidden lg:block" : ""} absolute rounded-full`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: themeVisuals.starColor,
          }}
          animate={
            shouldReduceMotion
              ? { opacity: star.opacity * themeVisuals.starOpacity }
              : {
                  opacity: [
                    star.opacity * themeVisuals.starOpacity,
                    (star.opacity + 0.15) * themeVisuals.starOpacity,
                    star.opacity * themeVisuals.starOpacity,
                  ],
                }
          }
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {weatherMotion.showParticles && (
        <motion.span
          className="absolute left-[28%] top-[20%] h-40 w-72 rounded-full blur-3xl"
          animate={{ backgroundColor: themeVisuals.particleColor }}
          transition={{ duration: 3.5, ease: "easeOut" }}
        />
      )}

      {!shouldReduceMotion && weatherMotion.showParticles && (
        <motion.span
          className="absolute left-[18%] top-[24%] h-px w-20 origin-left"
          style={{ background: themeVisuals.shootingStar }}
          initial={{ opacity: 0, x: 0, y: 0, rotate: -18 }}
          animate={{ opacity: [0, 0, 0.34, 0], x: [0, 240], y: [0, 70] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            repeatDelay: themeMode === "dark" ? 28 : 34,
            ease: "easeOut",
          }}
        />
      )}
    </div>
  );
});
