"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { CloudSun } from "lucide-react";
import type { TimeAtmosphere, WeatherExperience } from "@/types";

type GreetingProps = {
  atmosphere: TimeAtmosphere;
  weatherExperience: WeatherExperience;
  onEnableWeather: () => void;
};

const getWeatherButtonLabel = (status: WeatherExperience["status"]) => {
  if (status === "loading") return "Tuning Atmosphere";
  if (status === "ready") return "Weather Experience On";
  return "Weather Experience";
};

export const Greeting = memo(function Greeting({
  atmosphere,
  weatherExperience,
  onEnableWeather,
}: GreetingProps) {
  return (
    <motion.div
      key={atmosphere.greeting}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative z-30 mb-3 flex flex-col items-center gap-1 px-4 text-center"
      title={
        atmosphere.timeZone
          ? `Local time zone: ${atmosphere.timeZone}`
          : undefined
      }
    >
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 sm:text-base">
        {atmosphere.greeting}
      </span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
        {atmosphere.note}
      </span>
      <button
        type="button"
        onClick={onEnableWeather}
        disabled={weatherExperience.status === "loading"}
        className="mt-2 inline-flex h-8 items-center gap-2 rounded-full border border-zinc-900/10 bg-white/35 px-3 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-md transition-colors hover:bg-white/55 disabled:cursor-wait disabled:opacity-60 dark:border-white/10 dark:bg-black/20 dark:text-zinc-300 dark:hover:bg-black/30"
        aria-label="Enable Weather Experience"
      >
        <CloudSun className="h-3.5 w-3.5" />
        <span>{getWeatherButtonLabel(weatherExperience.status)}</span>
      </button>
    </motion.div>
  );
});
