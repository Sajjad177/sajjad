import type { DayPhase, OrbPosition } from "@/types";
import { easeInOutSine } from "./animationHelpers";

export const calculateOrbPosition = (
  time: number,
  phase: DayPhase
): OrbPosition => {
  const daylightProgress =
    phase === "morning"
      ? easeInOutSine((time - 5) / 5) * 0.34
      : phase === "afternoon"
        ? 0.34 + easeInOutSine((time - 10) / 6) * 0.32
        : phase === "evening"
          ? 0.66 + easeInOutSine((time - 16) / 3) * 0.34
          : 0;

  const nightTime = time >= 19 ? time - 19 : time + 5;
  const nightProgress = easeInOutSine(nightTime / 10);
  const orbitProgress = phase === "night" ? nightProgress : daylightProgress;

  return {
    x: 12 + orbitProgress * 76,
    y:
      phase === "night"
        ? 30 - Math.sin(orbitProgress * Math.PI) * 18
        : 72 - Math.sin(orbitProgress * Math.PI) * 55,
  };
};
