"use client";

import { memo, useMemo } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { WEATHER_FADE_SECONDS } from "@/constants";
import { useResolvedThemeMode } from "@/hooks";
import type { EnvironmentLayerProps } from "@/types";
import { calculateThemeAtmosphere, calculateWeatherMotion } from "@/utils";
import { CloudLayer } from "./CloudLayer";
import { FogLayer } from "./FogLayer";
import { LightningLayer } from "./LightningLayer";
import { OrbLayer } from "./OrbLayer";
import { RainLayer } from "./RainLayer";
import { StarLayer } from "./StarLayer";
import { ThemeCrossfadeLayer } from "./ThemeCrossfadeLayer";

export const HeroBackground = memo(function HeroBackground({
  atmosphere,
  scrollProgress,
  weather,
}: EnvironmentLayerProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const themeMode = useResolvedThemeMode();
  const isNight = atmosphere.phase === "night";
  const weatherMotion = useMemo(() => calculateWeatherMotion(weather), [weather]);
  const themeVisuals = useMemo(
    () => calculateThemeAtmosphere(atmosphere.phase, weather, themeMode),
    [atmosphere.phase, weather, themeMode]
  );

  const showClouds = true;
  const showStars =
    isNight &&
    themeVisuals.starOpacity > 0 &&
    weather !== "rain" &&
    weather !== "drizzle" &&
    weather !== "thunderstorm";
  const showRain =
    weather === "rain" || weather === "drizzle" || weather === "thunderstorm";
  const showFog = weather === "fog" || weather === "mist";
  const layerKey = `${themeMode}-${atmosphere.phase}-${weather ?? "time"}`;
  const phase = atmosphere.phase;
  const isEvening = phase === "evening";
  const isMorning = phase === "morning";
  const isAfternoon = phase === "afternoon";
  const skyOpacity = useTransform(scrollProgress, [0, 0.7, 1], [1, 0.68, 0.18]);
  const skyFilter = useTransform(
    scrollProgress,
    [0, 1],
    ["saturate(1) brightness(1)", "saturate(0.62) brightness(0.72)"]
  );
  const atmosphereY = useTransform(scrollProgress, [0, 1], [0, -54]);
  const atmosphereOpacity = useTransform(scrollProgress, [0, 0.76, 1], [1, 0.7, 0.2]);
  const horizonY = useTransform(scrollProgress, [0, 1], [0, 42]);
  const horizonOpacity = useTransform(scrollProgress, [0, 0.72, 1], [1, 0.82, 0.22]);
  const washOpacity = useTransform(scrollProgress, [0, 0.48, 1], [1, 0.82, 0.22]);
  const dissolveOpacity = useTransform(scrollProgress, [0, 0.45, 1], [0.8, 1, 1]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div className="absolute inset-0" style={{ opacity: skyOpacity, filter: skyFilter }}>
        <ThemeCrossfadeLayer id={`sky-${layerKey}`} background={themeVisuals.sky} />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ y: atmosphereY, opacity: atmosphereOpacity }}
        initial={false}
        animate={{
          background: isNight
            ? "linear-gradient(180deg, rgba(12,15,28,0.18) 0%, rgba(31,37,58,0.04) 42%, rgba(247,239,226,0.12) 100%)"
            : isEvening
              ? "linear-gradient(180deg, rgba(124,114,170,0.09) 0%, rgba(255,174,99,0.12) 50%, rgba(247,239,226,0.18) 100%)"
              : isMorning
                ? "linear-gradient(180deg, rgba(255,246,218,0.1) 0%, rgba(255,197,95,0.1) 54%, rgba(247,239,226,0.18) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(180,216,231,0.08) 48%, rgba(247,239,226,0.18) 100%)",
        }}
        transition={{ duration: WEATHER_FADE_SECONDS + 1, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-x-[-10%] bottom-[8%] h-[42%] blur-2xl"
        style={{ y: horizonY, opacity: horizonOpacity }}
        initial={false}
        animate={{
          background: isNight
            ? "radial-gradient(ellipse at 50% 100%, rgba(176,190,220,0.18), rgba(89,106,148,0.08) 36%, transparent 72%)"
            : isEvening
              ? "radial-gradient(ellipse at 58% 100%, rgba(255,160,87,0.22), rgba(255,216,157,0.12) 38%, transparent 74%)"
              : isAfternoon
                ? "radial-gradient(ellipse at 50% 100%, rgba(255,238,196,0.2), rgba(158,204,220,0.08) 42%, transparent 74%)"
                : "radial-gradient(ellipse at 38% 100%, rgba(255,202,112,0.22), rgba(255,241,206,0.12) 42%, transparent 74%)",
        }}
        transition={{ duration: WEATHER_FADE_SECONDS + 1, ease: "easeOut" }}
      />

      {showStars && (
        <StarLayer
          shouldReduceMotion={shouldReduceMotion}
          themeMode={themeMode}
          themeVisuals={themeVisuals}
          weatherMotion={weatherMotion}
        />
      )}

      <motion.div
        className="absolute inset-x-0 top-[18%] h-[34%]"
        initial={false}
        animate={{
          opacity: weather === "cloudy" || weather === "fog" || weather === "mist" ? 0.42 : 0.26,
          background: isNight
            ? "linear-gradient(180deg, transparent, rgba(204,216,238,0.08), transparent)"
            : "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)",
        }}
        transition={{ duration: WEATHER_FADE_SECONDS, ease: "easeOut" }}
      />

      {showClouds && (
        <CloudLayer
          phase={atmosphere.phase}
          scrollProgress={scrollProgress}
          shouldReduceMotion={shouldReduceMotion}
          themeVisuals={themeVisuals}
          weather={weather}
          weatherMotion={weatherMotion}
        />
      )}

      {showRain && (
        <RainLayer
          shouldReduceMotion={shouldReduceMotion}
          themeVisuals={themeVisuals}
        />
      )}
      {showFog && (
        <FogLayer
          shouldReduceMotion={shouldReduceMotion}
          themeVisuals={themeVisuals}
        />
      )}

      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: themeVisuals.dimColor }}
        initial={false}
        animate={{
          opacity: themeVisuals.dimOpacity,
          backgroundColor: themeVisuals.dimColor,
        }}
        transition={{ duration: WEATHER_FADE_SECONDS + 1, ease: "easeOut" }}
      />

      <OrbLayer
        isNight={isNight}
        orbPosition={atmosphere.orbPosition}
        scrollProgress={scrollProgress}
        shouldReduceMotion={shouldReduceMotion}
        themeVisuals={themeVisuals}
      />

      {weatherMotion.showLightning && !shouldReduceMotion && (
        <LightningLayer themeVisuals={themeVisuals} />
      )}

      <motion.div className="absolute inset-0" style={{ opacity: washOpacity }}>
        <ThemeCrossfadeLayer
          id={`glow-${layerKey}`}
          background={themeVisuals.glow}
        />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: washOpacity }}>
        <ThemeCrossfadeLayer
          id={`wash-${layerKey}`}
          background={themeVisuals.contentWash}
        />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-[-1px] h-72 md:h-96"
        style={{ opacity: dissolveOpacity }}
        initial={false}
        animate={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--background) 0%, transparent) 0%, color-mix(in oklab, var(--background) 34%, transparent) 34%, color-mix(in oklab, var(--background) 78%, transparent) 68%, var(--background) 100%)",
        }}
        transition={{ duration: WEATHER_FADE_SECONDS, ease: "easeOut" }}
      />
    </div>
  );
});
