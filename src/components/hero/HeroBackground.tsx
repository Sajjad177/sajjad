"use client";

import { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  weather,
}: EnvironmentLayerProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const themeMode = useResolvedThemeMode();
  const isNight = atmosphere.phase === "night";
  const isDaytime = !isNight;
  const weatherMotion = useMemo(() => calculateWeatherMotion(weather), [weather]);
  const themeVisuals = useMemo(
    () => calculateThemeAtmosphere(atmosphere.phase, weather, themeMode),
    [atmosphere.phase, weather, themeMode]
  );

  const showClouds =
    isDaytime ||
    weather === "partly-cloudy" ||
    weather === "cloudy" ||
    weather === "rain" ||
    weather === "drizzle" ||
    weather === "thunderstorm" ||
    weather === "fog" ||
    weather === "mist";
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

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <ThemeCrossfadeLayer id={`sky-${layerKey}`} background={themeVisuals.sky} />

      {showStars && (
        <StarLayer
          shouldReduceMotion={shouldReduceMotion}
          themeMode={themeMode}
          themeVisuals={themeVisuals}
          weatherMotion={weatherMotion}
        />
      )}

      {showClouds && (
        <CloudLayer
          shouldReduceMotion={shouldReduceMotion}
          themeVisuals={themeVisuals}
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
        shouldReduceMotion={shouldReduceMotion}
        themeVisuals={themeVisuals}
      />

      {weatherMotion.showLightning && !shouldReduceMotion && (
        <LightningLayer themeVisuals={themeVisuals} />
      )}

      <ThemeCrossfadeLayer
        id={`glow-${layerKey}`}
        background={themeVisuals.glow}
      />
      <ThemeCrossfadeLayer
        id={`wash-${layerKey}`}
        background={themeVisuals.contentWash}
      />
    </div>
  );
});
