import type { WeatherCondition, WeatherMotion } from "@/types";

export const calculateWeatherMotion = (
  condition: WeatherCondition | null
): WeatherMotion => {
  const motion: WeatherMotion = {
    cloudCount: 2,
    showLightning: false,
    showParticles: condition === "clear" || condition === "mostly-clear",
  };

  if (!condition || condition === "clear" || condition === "mostly-clear") {
    return motion;
  }

  if (condition === "partly-cloudy") {
    return { ...motion, cloudCount: 3 };
  }

  if (condition === "thunderstorm") {
    return {
      ...motion,
      cloudCount: 5,
      showLightning: true,
      showParticles: false,
    };
  }

  if (condition === "fog" || condition === "mist") {
    return { ...motion, cloudCount: 3, showParticles: false };
  }

  if (condition === "snow") {
    return { ...motion, cloudCount: 4, showParticles: false };
  }

  return { ...motion, cloudCount: 5, showParticles: false };
};
