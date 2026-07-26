"use client";

import { useMemo } from "react";
import { useLocalTime } from "./useLocalTime";
import { useWeather } from "./useWeather";

export const useEnvironment = () => {
  const atmosphere = useLocalTime();
  const { weatherExperience, enableWeatherExperience } = useWeather();
  const weather = weatherExperience.enabled ? weatherExperience.condition : null;

  return useMemo(
    () => ({
      atmosphere,
      weather,
      weatherExperience,
      enableWeatherExperience,
    }),
    [atmosphere, weather, weatherExperience, enableWeatherExperience]
  );
};
