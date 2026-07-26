import type { TimeAtmosphere, WeatherMotion } from "./environment";
import type { ThemeAtmosphere, ThemeMode } from "./theme";
import type { WeatherCondition } from "./weather";

export type EnvironmentLayerProps = {
  atmosphere: TimeAtmosphere;
  weather: WeatherCondition | null;
};

export type EnvironmentVisualProps = {
  shouldReduceMotion: boolean;
  themeMode: ThemeMode;
  themeVisuals: ThemeAtmosphere;
  weatherMotion: WeatherMotion;
};

export type CloudSeed = {
  id: number;
  top: string;
  width: number;
  delay: number;
  duration: number;
};

export type RainSeed = {
  id: number;
  x: number;
  y: number;
  height: number;
  opacity: number;
  duration: number;
  delay: number;
};

export type StarSeed = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

export type FogSeed = {
  id: number;
  top: string;
  delay: number;
  duration: number;
  opacity: number;
};

export type RippleSeed = {
  id: number;
  left: string;
  delay: number;
};
