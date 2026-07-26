"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { CLOUD_SEEDS, COLOR_TRANSITION } from "@/constants";
import type { EnvironmentVisualProps } from "@/types";

type CloudLayerProps = Pick<
  EnvironmentVisualProps,
  "shouldReduceMotion" | "themeVisuals" | "weatherMotion"
>;

const cloudPuffStyle = (color: string) => ({
  backgroundColor: color,
  transition: COLOR_TRANSITION,
});

export const CloudLayer = memo(function CloudLayer({
  shouldReduceMotion,
  themeVisuals,
  weatherMotion,
}: CloudLayerProps) {
  const activeClouds = CLOUD_SEEDS.slice(0, weatherMotion.cloudCount);

  return (
    <motion.div
      className="hidden sm:block"
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      {activeClouds.map((cloud, index) => (
        <motion.div
          key={cloud.id}
          className={`${index > 1 ? "hidden lg:block" : ""} absolute h-10 rounded-full blur-sm`}
          style={{
            top: cloud.top,
            width: cloud.width,
            backgroundColor: themeVisuals.cloudColor,
            transition: COLOR_TRANSITION,
          }}
          initial={{ x: "-28vw", opacity: themeVisuals.cloudOpacity }}
          animate={
            shouldReduceMotion
              ? {
                  x: "18vw",
                  opacity: themeVisuals.cloudOpacity,
                  backgroundColor: themeVisuals.cloudColor,
                }
              : {
                  x: ["-28vw", "108vw"],
                  opacity: [
                    0,
                    themeVisuals.cloudOpacity,
                    themeVisuals.cloudOpacity * 0.85,
                    0,
                  ],
                  backgroundColor: themeVisuals.cloudColor,
                }
          }
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: "linear",
          }}
        >
          <span
            className="absolute left-7 top-[-14px] h-12 w-20 rounded-full"
            style={cloudPuffStyle(themeVisuals.cloudColor)}
          />
          <span
            className="absolute left-20 top-[-22px] h-16 w-24 rounded-full"
            style={cloudPuffStyle(themeVisuals.cloudColor)}
          />
          <span
            className="absolute left-32 top-[-8px] h-11 w-20 rounded-full"
            style={cloudPuffStyle(themeVisuals.cloudColor)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
});
