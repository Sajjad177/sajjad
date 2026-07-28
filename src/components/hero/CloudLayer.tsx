"use client";

import { memo } from "react";
import { motion, useTransform } from "framer-motion";
import { CLOUD_SEEDS, COLOR_TRANSITION } from "@/constants";
import type { DayPhase, EnvironmentVisualProps, WeatherCondition } from "@/types";

type CloudLayerProps = Pick<
  EnvironmentVisualProps,
  "scrollProgress" | "shouldReduceMotion" | "themeVisuals" | "weatherMotion"
> & {
  phase: DayPhase;
  weather: WeatherCondition | null;
};

const CLOUD_DEPTH = [
  {
    name: "background",
    scale: 0.72,
    height: 42,
    blur: "blur-[2.5px]",
    opacity: 0.58,
    y: -28,
    speed: 1.85,
    distance: "118vw",
    start: "-32vw",
    direction: 1,
    z: "z-[2]",
  },
  {
    name: "mid",
    scale: 1,
    height: 58,
    blur: "blur-[1.2px]",
    opacity: 1,
    y: 12,
    speed: 1.14,
    distance: "112vw",
    start: "-36vw",
    direction: 1,
    z: "z-[6]",
  },
  {
    name: "foreground",
    scale: 1.34,
    height: 74,
    blur: "blur-[0.45px]",
    opacity: 0.9,
    y: 72,
    speed: 0.92,
    distance: "-34vw",
    start: "112vw",
    direction: -1,
    z: "z-[12]",
  },
] as const;

const CLOUD_PALETTES: Record<
  DayPhase,
  {
    body: string;
    highlight: string;
    shadow: string;
    edge: string;
    shade: string;
  }
> = {
  morning: {
    body: "rgba(255, 246, 226, 0.9)",
    highlight: "rgba(255, 255, 247, 0.96)",
    shadow: "rgba(236, 174, 96, 0.3)",
    edge: "rgba(255, 217, 154, 0.34)",
    shade: "rgba(174, 122, 67, 0.14)",
  },
  afternoon: {
    body: "rgba(250, 253, 252, 0.92)",
    highlight: "rgba(255, 255, 255, 0.98)",
    shadow: "rgba(118, 158, 178, 0.24)",
    edge: "rgba(209, 234, 242, 0.42)",
    shade: "rgba(74, 104, 124, 0.12)",
  },
  evening: {
    body: "rgba(255, 224, 205, 0.88)",
    highlight: "rgba(255, 242, 232, 0.96)",
    shadow: "rgba(193, 102, 111, 0.24)",
    edge: "rgba(255, 153, 117, 0.32)",
    shade: "rgba(111, 71, 117, 0.13)",
  },
  night: {
    body: "rgba(157, 174, 205, 0.72)",
    highlight: "rgba(213, 225, 246, 0.66)",
    shadow: "rgba(31, 40, 68, 0.36)",
    edge: "rgba(170, 199, 244, 0.2)",
    shade: "rgba(5, 10, 24, 0.18)",
  },
};

const getCloudOpacity = (
  phase: DayPhase,
  weather: WeatherCondition | null,
  depthOpacity: number
) => {
  const phaseOpacity = phase === "night" ? 0.58 : phase === "afternoon" ? 0.54 : 0.5;
  const weatherBoost =
    weather === "cloudy" || weather === "rain" || weather === "drizzle"
      ? 0.16
      : weather === "thunderstorm"
        ? 0.2
        : weather === "fog" || weather === "mist"
          ? 0.08
          : 0;

  return Math.min((phaseOpacity + weatherBoost) * depthOpacity, 0.76);
};

const createCloudBody = (
  palette: (typeof CLOUD_PALETTES)[DayPhase],
  depthName: (typeof CLOUD_DEPTH)[number]["name"]
) => ({
  background: `
    radial-gradient(circle at 24% 30%, ${palette.highlight} 0 18%, transparent 28%),
    radial-gradient(circle at 47% 18%, ${palette.highlight} 0 22%, transparent 34%),
    radial-gradient(circle at 70% 34%, ${palette.body} 0 20%, transparent 32%),
    linear-gradient(180deg, ${palette.body} 0%, ${palette.edge} 58%, ${palette.shadow} 100%)
  `,
  boxShadow:
    depthName === "foreground"
      ? `inset 0 14px 22px rgba(255,255,255,0.18), inset 0 -14px 24px ${palette.shade}, 0 16px 38px ${palette.shade}`
      : `inset 0 10px 20px rgba(255,255,255,0.16), inset 0 -10px 18px ${palette.shade}, 0 12px 30px ${palette.shade}`,
  maskImage:
    "radial-gradient(ellipse at center, black 62%, rgba(0,0,0,0.72) 78%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse at center, black 62%, rgba(0,0,0,0.72) 78%, transparent 100%)",
  transition: COLOR_TRANSITION,
});

const createPuffStyle = (
  palette: (typeof CLOUD_PALETTES)[DayPhase],
  variant: "bright" | "body" | "shadow"
) => ({
  background:
    variant === "bright"
      ? `radial-gradient(circle at 35% 28%, ${palette.highlight}, ${palette.body} 54%, ${palette.edge} 100%)`
      : variant === "shadow"
        ? `radial-gradient(circle at 42% 28%, ${palette.body}, ${palette.shadow} 72%, transparent 100%)`
        : `radial-gradient(circle at 38% 30%, ${palette.body}, ${palette.edge} 78%, transparent 100%)`,
  transition: COLOR_TRANSITION,
});

export const CloudLayer = memo(function CloudLayer({
  phase,
  scrollProgress,
  shouldReduceMotion,
  themeVisuals,
  weather,
  weatherMotion,
}: CloudLayerProps) {
  const activeClouds = CLOUD_SEEDS.slice(0, Math.max(weatherMotion.cloudCount, 5));
  const cloudLift = useTransform(scrollProgress, [0, 1], [0, -86]);
  const cloudFilter = useTransform(
    scrollProgress,
    [0, 1],
    ["saturate(1.04) blur(0px)", "saturate(0.72) blur(2.5px)"]
  );
  const palette = CLOUD_PALETTES[phase];

  return (
    <motion.div
      className="absolute inset-0 block"
      style={{ y: cloudLift, filter: cloudFilter }}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      {CLOUD_DEPTH.map((depth, depthIndex) =>
        activeClouds.map((cloud, index) => (
          <Cloud
            key={`${depthIndex}-${cloud.id}`}
            cloud={cloud}
            depth={depth}
            depthIndex={depthIndex}
            index={index}
            palette={palette}
            phase={phase}
            scrollProgress={scrollProgress}
            shouldReduceMotion={shouldReduceMotion}
            themeVisuals={themeVisuals}
            weather={weather}
          />
        ))
      )}
    </motion.div>
  );
});

type CloudProps = {
  cloud: (typeof CLOUD_SEEDS)[number];
  depth: (typeof CLOUD_DEPTH)[number];
  depthIndex: number;
  index: number;
  palette: (typeof CLOUD_PALETTES)[DayPhase];
} & Pick<
  CloudLayerProps,
  "phase" | "scrollProgress" | "shouldReduceMotion" | "themeVisuals" | "weather"
>;

const Cloud = memo(function Cloud({
  cloud,
  depth,
  depthIndex,
  index,
  palette,
  phase,
  scrollProgress,
  shouldReduceMotion,
  themeVisuals,
  weather,
}: CloudProps) {
  const exitStart = Math.min(0.5 + index * 0.08 + depthIndex * 0.06, 0.82);
  const baseOpacity = getCloudOpacity(phase, weather, depth.opacity);
  const scrollOpacity = useTransform(
    scrollProgress,
    [0, exitStart, 1],
    [baseOpacity, baseOpacity * 0.9, 0]
  );
  const topOffset = index % 2 === 0 ? depth.y : depth.y + 34;
  const cloudTop = `calc(${cloud.top} + ${topOffset}px)`;
  const width = cloud.width * depth.scale;
  const height = depth.height + (index % 3) * 7;
  const start = depth.direction === 1 ? depth.start : `${112 - index * 8}vw`;
  const end = depth.direction === 1 ? `${depth.distance}` : depth.distance;

  return (
    <motion.div
      className={`${index > 2 && depth.name !== "mid" ? "hidden md:block" : ""} ${index > 3 ? "hidden lg:block" : ""} ${depth.z} absolute rounded-full ${depth.blur}`}
      style={{
        top: cloudTop,
        width,
        height,
        opacity: scrollOpacity,
        ...createCloudBody(palette, depth.name),
        transition: COLOR_TRANSITION,
      }}
      initial={{ x: start }}
      animate={
        shouldReduceMotion
          ? {
              x: `${18 + depthIndex * 9 - index * 2}vw`,
          }
          : {
              x: [start, end],
          }
      }
      transition={{
        duration: cloud.duration * depth.speed + depthIndex * 4,
        repeat: Infinity,
        delay: cloud.delay + depthIndex * 5 + index * 0.65,
        ease: "linear",
      }}
    >
      <span
        className="absolute left-[7%] top-[-24%] h-[112%] w-[34%] rounded-full"
        style={createPuffStyle(palette, "body")}
      />
      <span
        className="absolute left-[27%] top-[-48%] h-[142%] w-[42%] rounded-full"
        style={createPuffStyle(palette, "bright")}
      />
      <span
        className="absolute left-[58%] top-[-20%] h-[112%] w-[38%] rounded-full"
        style={createPuffStyle(palette, "body")}
      />
      <span
        className="absolute left-[20%] top-[24%] h-[76%] w-[68%] rounded-full opacity-75"
        style={createPuffStyle(palette, "shadow")}
      />
      <span
        className="absolute left-[48%] top-[8%] h-[72%] w-[46%] rounded-full opacity-60"
        style={createPuffStyle(palette, "bright")}
      />
      <span
        className="absolute inset-x-[8%] bottom-[-12%] h-[42%] rounded-full blur-md"
        style={{
          background: `linear-gradient(180deg, transparent, ${themeVisuals.dimColor})`,
          opacity: phase === "night" ? 0.08 : 0.05,
        }}
      />
    </motion.div>
  );
});
