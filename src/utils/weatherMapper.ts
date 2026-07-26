import type { WeatherCondition } from "@/types";

export const mapWeatherCodeToCondition = (
  weatherCode: number
): WeatherCondition => {
  if (weatherCode === 0) return "clear";
  if (weatherCode === 1) return "mostly-clear";
  if (weatherCode === 2) return "partly-cloudy";
  if (weatherCode === 3) return "cloudy";
  if (weatherCode === 45) return "fog";
  if (weatherCode === 48) return "mist";
  if (weatherCode >= 51 && weatherCode <= 57) return "drizzle";
  if (weatherCode >= 61 && weatherCode <= 67) return "rain";
  if (weatherCode >= 71 && weatherCode <= 77) return "snow";
  if (weatherCode >= 80 && weatherCode <= 82) return "rain";
  if (weatherCode >= 95 && weatherCode <= 99) return "thunderstorm";

  return "clear";
};
