import type { CloudSeed, FogSeed, RainSeed, RippleSeed, StarSeed } from "@/types";

export const COLOR_TRANSITION =
  "background-color 3.5s ease, border-color 3.5s ease";

export const CLOUD_SEEDS: CloudSeed[] = [
  { id: 1, top: "28%", width: 210, delay: 0, duration: 34 },
  { id: 2, top: "42%", width: 150, delay: 8, duration: 38 },
  { id: 3, top: "20%", width: 120, delay: 15, duration: 30 },
  { id: 4, top: "34%", width: 270, delay: 6, duration: 44 },
  { id: 5, top: "16%", width: 180, delay: 18, duration: 40 },
];

export const FOG_SEEDS: FogSeed[] = [
  { id: 1, top: "36%", delay: 0, duration: 28, opacity: 0.14 },
  { id: 2, top: "52%", delay: 6, duration: 34, opacity: 0.18 },
  { id: 3, top: "66%", delay: 12, duration: 38, opacity: 0.13 },
];

export const RIPPLE_SEEDS: RippleSeed[] = [
  { id: 1, left: "18%", delay: 0 },
  { id: 2, left: "46%", delay: 1.2 },
  { id: 3, left: "73%", delay: 2.4 },
];

export const RAIN_SEEDS: RainSeed[] = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  x: (index * 19 + 7) % 100,
  y: -20 - ((index * 13) % 60),
  height: 34 + (index % 5) * 10,
  opacity: 0.08 + (index % 4) * 0.025,
  duration: 1.5 + (index % 6) * 0.22,
  delay: (index % 13) * 0.12,
}));

export const STAR_SEEDS: StarSeed[] = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  x: (index * 23 + 11) % 100,
  y: 8 + ((index * 37 + 17) % 58),
  size: 1 + ((index * 7) % 3),
  opacity: 0.14 + ((index * 5) % 8) / 100,
  duration: 3.8 + (index % 7) * 0.45,
  delay: (index % 9) * 0.34,
}));
