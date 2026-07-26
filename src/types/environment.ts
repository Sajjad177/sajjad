import type { WeatherCondition } from "./weather";

export type DayPhase = "morning" | "afternoon" | "evening" | "night";

export type EnvironmentGreeting = {
  greeting: string;
  note: string;
};

export type OrbPosition = {
  x: number;
  y: number;
};

export type TimeAtmosphere = EnvironmentGreeting & {
  phase: DayPhase;
  timeZone: string;
  orbPosition: OrbPosition;
};

export type WeatherMotion = {
  cloudCount: number;
  showLightning: boolean;
  showParticles: boolean;
};

export type EnvironmentState = {
  time: TimeAtmosphere;
  weather: WeatherCondition | null;
};
