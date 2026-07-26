import type { DayPhase, EnvironmentGreeting, TimeAtmosphere } from "@/types";
import { calculateOrbPosition } from "./calculateOrbPosition";

export const INITIAL_TIME_ATMOSPHERE: TimeAtmosphere = {
  phase: "afternoon",
  greeting: "🌤 Good Afternoon",
  note: "Currently experiencing your local daylight.",
  timeZone: "",
  orbPosition: { x: 50, y: 17 },
};

const PHASE_GREETINGS: Record<DayPhase, EnvironmentGreeting> = {
  morning: {
    greeting: "☀️ Good Morning",
    note: "Currently experiencing your local daylight.",
  },
  afternoon: {
    greeting: "🌤 Good Afternoon",
    note: "Currently experiencing your local daylight.",
  },
  evening: {
    greeting: "🌇 Good Evening",
    note: "This portfolio adapts to your time of day.",
  },
  night: {
    greeting: "🌙 Good Night",
    note: "You're browsing after sunset. Welcome, and thanks for stopping by.",
  },
};

const getDayPhase = (time: number): DayPhase => {
  if (time >= 5 && time < 10) return "morning";
  if (time >= 10 && time < 16) return "afternoon";
  if (time >= 16 && time < 19) return "evening";
  return "night";
};

export const calculateLocalTimeAtmosphere = (date: Date): TimeAtmosphere => {
  const time = date.getHours() + date.getMinutes() / 60;
  const phase = getDayPhase(time);

  return {
    ...PHASE_GREETINGS[phase],
    phase,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    orbPosition: calculateOrbPosition(time, phase),
  };
};
