import {
  DARK_BASE_ATMOSPHERE,
  DARK_GLOWS,
  DARK_SKY_GRADIENTS,
  LIGHT_BASE_ATMOSPHERE,
  LIGHT_GLOWS,
  LIGHT_SKY_GRADIENTS,
} from "@/constants";
import type { DayPhase, ThemeAtmosphere, ThemeMode, WeatherCondition } from "@/types";

const getBaseAtmosphere = (
  phase: DayPhase,
  theme: ThemeMode
): ThemeAtmosphere => {
  const isDark = theme === "dark";
  const isNight = phase === "night";
  const base = isDark ? DARK_BASE_ATMOSPHERE : LIGHT_BASE_ATMOSPHERE;

  return {
    ...base,
    sky: isDark ? DARK_SKY_GRADIENTS[phase] : LIGHT_SKY_GRADIENTS[phase],
    glow: isDark ? DARK_GLOWS[phase] : LIGHT_GLOWS[phase],
    starOpacity: isNight ? (isDark ? 1 : 0.52) : 0,
    orb: isNight
      ? isDark
        ? "radial-gradient(circle at 38% 34%, #f4f7fb 0%, #cbd8ea 58%, #aab8cf 100%)"
        : "radial-gradient(circle at 38% 34%, #f6f4ec 0%, #d8d3c4 58%, #bbb5a7 100%)"
      : base.orb,
    orbShadow: isNight
      ? isDark
        ? "0 0 42px rgba(214,226,244,0.24), 0 0 96px rgba(187,204,230,0.12)"
        : "0 0 42px rgba(180,176,165,0.16), 0 0 90px rgba(255,218,170,0.08)"
      : base.orbShadow,
    orbOpacity: isNight ? (isDark ? 0.46 : 0.34) : base.orbOpacity,
  };
};

export const calculateThemeAtmosphere = (
  phase: DayPhase,
  condition: WeatherCondition | null,
  theme: ThemeMode
): ThemeAtmosphere => {
  const visual = getBaseAtmosphere(phase, theme);
  const isDark = theme === "dark";

  if (condition === "partly-cloudy") {
    return {
      ...visual,
      cloudOpacity: isDark ? 0.14 : 0.11,
      starOpacity: visual.starOpacity * 0.72,
      orbOpacity: visual.orbOpacity * 0.86,
    };
  }

  if (condition === "cloudy") {
    return {
      ...visual,
      cloudColor: isDark ? "rgba(228, 228, 231, 0.85)" : "rgba(88, 83, 76, 0.3)",
      cloudOpacity: isDark ? 0.22 : 0.13,
      dimColor: isDark ? "rgba(9, 9, 11, 1)" : "rgba(193, 136, 72, 1)",
      dimOpacity: isDark ? 0.2 : 0.07,
      starOpacity: visual.starOpacity * 0.18,
      orbOpacity: visual.orbOpacity * (isDark ? 0.28 : 0.44),
    };
  }

  if (condition === "rain" || condition === "drizzle") {
    const isRain = condition === "rain";

    return {
      ...visual,
      cloudColor: isDark ? "rgba(212, 212, 216, 0.8)" : "rgba(82, 78, 72, 0.32)",
      cloudOpacity: isDark ? 0.24 : 0.13,
      dimColor: isDark ? "rgba(9, 9, 11, 1)" : "rgba(191, 125, 58, 1)",
      dimOpacity: isDark ? (isRain ? 0.26 : 0.18) : isRain ? 0.08 : 0.05,
      rainOpacity: isDark ? (isRain ? 0.38 : 0.22) : isRain ? 0.18 : 0.11,
      starOpacity: 0,
      orbOpacity: visual.orbOpacity * (isDark ? 0.22 : 0.34),
    };
  }

  if (condition === "thunderstorm") {
    return {
      ...visual,
      cloudColor: isDark ? "rgba(161, 161, 170, 0.8)" : "rgba(70, 67, 63, 0.34)",
      cloudOpacity: isDark ? 0.28 : 0.14,
      dimColor: isDark ? "rgba(9, 9, 11, 1)" : "rgba(166, 103, 52, 1)",
      dimOpacity: isDark ? 0.34 : 0.1,
      rainOpacity: isDark ? 0.28 : 0.14,
      starOpacity: 0,
      orbOpacity: visual.orbOpacity * (isDark ? 0.18 : 0.26),
    };
  }

  if (condition === "fog" || condition === "mist") {
    return {
      ...visual,
      cloudColor: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(116, 108, 94, 0.2)",
      cloudOpacity: isDark ? 0.16 : 0.09,
      dimColor: isDark ? "rgba(9, 9, 11, 1)" : "rgba(216, 158, 88, 1)",
      dimOpacity: isDark ? 0.12 : 0.05,
      fogOpacity: isDark ? 0.46 : 0.24,
      starOpacity: visual.starOpacity * 0.16,
      orbOpacity: visual.orbOpacity * (isDark ? 0.38 : 0.46),
    };
  }

  return visual;
};
