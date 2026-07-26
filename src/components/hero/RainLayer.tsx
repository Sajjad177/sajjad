"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { COLOR_TRANSITION, RAIN_SEEDS, RIPPLE_SEEDS } from "@/constants";
import type { EnvironmentVisualProps } from "@/types";

type RainLayerProps = Pick<
  EnvironmentVisualProps,
  "shouldReduceMotion" | "themeVisuals"
>;

export const RainLayer = memo(function RainLayer({
  shouldReduceMotion,
  themeVisuals,
}: RainLayerProps) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: themeVisuals.rainOpacity }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      {RAIN_SEEDS.map((drop, index) => (
        <motion.span
          key={drop.id}
          className={`${index > 22 ? "hidden sm:block" : ""} absolute block w-px origin-top`}
          style={{
            left: `${drop.x}%`,
            top: `${drop.y}%`,
            height: drop.height,
            background: `linear-gradient(180deg, transparent, ${themeVisuals.rainColor}, transparent)`,
            transition: "background 3.5s ease",
          }}
          initial={{ y: "-18vh", opacity: drop.opacity }}
          animate={
            shouldReduceMotion
              ? { y: "24vh", opacity: drop.opacity * 0.5 }
              : { y: ["-18vh", "118vh"], opacity: [0, drop.opacity, 0] }
          }
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear",
          }}
        />
      ))}

      {!shouldReduceMotion && (
        <div className="hidden md:block">
          {RIPPLE_SEEDS.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute bottom-[8%] h-5 w-16 rounded-full border"
              style={{
                left: ripple.left,
                borderColor: themeVisuals.rippleColor,
                transition: COLOR_TRANSITION,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.22, 0], scale: [0.6, 1.3, 1.8] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: ripple.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
});
