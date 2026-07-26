"use client";

import { useCallback, useState } from "react";
import {
  GEOLOCATION_TIMEOUT,
  OPEN_METEO_CURRENT_WEATHER_URL,
  WEATHER_CACHE_KEY,
  WEATHER_CACHE_TTL,
} from "@/constants";
import type { WeatherApiResponse, WeatherCondition, WeatherExperience } from "@/types";
import { mapWeatherCodeToCondition } from "@/utils";

const getCachedWeather = (): WeatherCondition | null => {
  try {
    const cached = window.localStorage.getItem(WEATHER_CACHE_KEY);
    if (!cached) return null;

    const parsed = JSON.parse(cached) as {
      condition?: WeatherCondition;
      timestamp?: number;
    };

    if (!parsed.condition || !parsed.timestamp) return null;
    if (Date.now() - parsed.timestamp > WEATHER_CACHE_TTL) return null;

    return parsed.condition;
  } catch {
    return null;
  }
};

const setCachedWeather = (condition: WeatherCondition) => {
  try {
    window.localStorage.setItem(
      WEATHER_CACHE_KEY,
      JSON.stringify({ condition, timestamp: Date.now() })
    );
  } catch {
    // Weather is a progressive enhancement.
  }
};

const requestLocation = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: WEATHER_CACHE_TTL,
      timeout: GEOLOCATION_TIMEOUT,
    });
  });

const fetchWeatherCondition = async (
  latitude: number,
  longitude: number
): Promise<WeatherCondition> => {
  const params = new URLSearchParams({
    latitude: latitude.toFixed(3),
    longitude: longitude.toFixed(3),
    current: "weather_code",
  });
  const response = await fetch(`${OPEN_METEO_CURRENT_WEATHER_URL}?${params}`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Weather request failed");

  const data = (await response.json()) as WeatherApiResponse;
  const weatherCode = data.current?.weather_code;

  if (typeof weatherCode !== "number") {
    throw new Error("Weather response missing code");
  }

  return mapWeatherCodeToCondition(weatherCode);
};

export const useWeather = () => {
  const [experience, setExperience] = useState<WeatherExperience>({
    condition: null,
    enabled: false,
    status: "idle",
  });

  const enableWeatherExperience = useCallback(async () => {
    if (experience.status === "loading") return;

    const cachedCondition = getCachedWeather();
    if (cachedCondition) {
      setExperience({ condition: cachedCondition, enabled: true, status: "ready" });
      return;
    }

    if (!("geolocation" in navigator)) {
      setExperience({ condition: null, enabled: false, status: "unavailable" });
      return;
    }

    setExperience((current) => ({ ...current, enabled: true, status: "loading" }));

    try {
      const position = await requestLocation();
      const { latitude, longitude } = position.coords;
      const condition = await fetchWeatherCondition(latitude, longitude);

      setCachedWeather(condition);
      setExperience({ condition, enabled: true, status: "ready" });
    } catch {
      setExperience({ condition: null, enabled: false, status: "unavailable" });
    }
  }, [experience.status]);

  return {
    weatherExperience: experience,
    enableWeatherExperience,
  };
};
