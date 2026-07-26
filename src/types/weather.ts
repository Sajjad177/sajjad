export type WeatherCondition =
  | "clear"
  | "mostly-clear"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "drizzle"
  | "thunderstorm"
  | "snow"
  | "fog"
  | "mist";

export type WeatherStatus = "idle" | "loading" | "ready" | "unavailable";

export type WeatherExperience = {
  condition: WeatherCondition | null;
  enabled: boolean;
  status: WeatherStatus;
};

export type WeatherApiResponse = {
  current?: {
    weather_code?: number;
  };
};
