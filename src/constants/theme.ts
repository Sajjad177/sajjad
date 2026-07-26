import type { DayPhase, ThemeAtmosphere } from "@/types";

export const LIGHT_SKY_GRADIENTS: Record<DayPhase, string> = {
  morning:
    "linear-gradient(180deg, rgba(220,236,239,0.76) 0%, rgba(255,221,166,0.46) 52%, rgba(247,239,226,0.96) 100%)",
  afternoon:
    "linear-gradient(180deg, rgba(190,220,232,0.58) 0%, rgba(250,232,191,0.34) 56%, rgba(247,239,226,0.98) 100%)",
  evening:
    "linear-gradient(180deg, rgba(188,165,201,0.34) 0%, rgba(248,177,117,0.46) 52%, rgba(247,239,226,0.98) 100%)",
  night:
    "linear-gradient(180deg, rgba(95,101,126,0.34) 0%, rgba(209,181,154,0.2) 50%, rgba(247,239,226,0.98) 100%)",
};

export const DARK_SKY_GRADIENTS: Record<DayPhase, string> = {
  morning:
    "linear-gradient(180deg, rgba(210,229,239,0.62) 0%, rgba(247,222,180,0.46) 54%, rgba(247,239,226,0.84) 100%)",
  afternoon:
    "linear-gradient(180deg, rgba(166,205,228,0.48) 0%, rgba(231,239,235,0.38) 55%, rgba(247,239,226,0.86) 100%)",
  evening:
    "linear-gradient(180deg, rgba(116,126,171,0.34) 0%, rgba(241,154,91,0.34) 54%, rgba(247,239,226,0.86) 100%)",
  night:
    "linear-gradient(180deg, rgba(26,30,48,0.74) 0%, rgba(37,40,58,0.55) 50%, rgba(26,26,26,0.9) 100%)",
};

export const LIGHT_GLOWS: Record<DayPhase, string> = {
  morning:
    "radial-gradient(circle at 28% 72%, rgba(255,178,76,0.24), transparent 32%), radial-gradient(circle at 52% 36%, rgba(255,248,221,0.22), transparent 42%)",
  afternoon:
    "radial-gradient(circle at 50% 20%, rgba(255,211,103,0.22), transparent 32%), radial-gradient(circle at 50% 56%, rgba(255,246,223,0.2), transparent 44%)",
  evening:
    "radial-gradient(circle at 74% 70%, rgba(255,159,92,0.24), transparent 34%), radial-gradient(circle at 44% 34%, rgba(155,121,172,0.12), transparent 42%)",
  night:
    "radial-gradient(circle at 58% 28%, rgba(201,211,230,0.14), transparent 30%), radial-gradient(circle at 50% 65%, rgba(255,210,165,0.12), transparent 40%)",
};

export const DARK_GLOWS: Record<DayPhase, string> = {
  morning:
    "radial-gradient(circle at 28% 72%, rgba(255,176,46,0.18), transparent 32%), radial-gradient(circle at 50% 45%, rgba(255,255,255,0.16), transparent 44%)",
  afternoon:
    "radial-gradient(circle at 50% 20%, rgba(255,237,178,0.18), transparent 34%), radial-gradient(circle at 50% 54%, rgba(255,255,255,0.12), transparent 45%)",
  evening:
    "radial-gradient(circle at 74% 70%, rgba(255,148,72,0.2), transparent 34%), radial-gradient(circle at 48% 34%, rgba(119,92,168,0.1), transparent 44%)",
  night:
    "radial-gradient(circle at 58% 28%, rgba(209,220,236,0.14), transparent 30%), radial-gradient(circle at 50% 65%, rgba(74,139,122,0.08), transparent 42%)",
};

export const LIGHT_BASE_ATMOSPHERE: Omit<ThemeAtmosphere, "sky" | "glow"> = {
  cloudColor: "rgba(86, 82, 76, 0.34)",
  cloudOpacity: 0.16,
  dimColor: "rgba(174, 121, 64, 1)",
  dimOpacity: 0,
  fogColor: "rgba(255, 248, 232, 0.48)",
  fogOpacity: 0,
  rainColor: "rgba(85, 92, 102, 0.34)",
  rainOpacity: 0,
  rippleColor: "rgba(94, 84, 72, 0.14)",
  starColor: "rgba(82, 87, 108, 0.34)",
  starOpacity: 0,
  orb: "radial-gradient(circle at 35% 35%, #fff6bb 0%, #ffd05c 56%, #f3a63e 100%)",
  orbShadow: "0 0 44px rgba(247,177,61,0.2), 0 0 92px rgba(255,205,113,0.13)",
  orbOpacity: 0.38,
  moonCutoutColor: "rgba(247,239,226,0.48)",
  lightning: "radial-gradient(circle at 62% 22%, rgba(255,222,170,0.24), transparent 34%)",
  particleColor: "rgba(150, 116, 72, 0.055)",
  shootingStar: "linear-gradient(90deg, rgba(122,111,92,0.22), transparent)",
  contentWash:
    "linear-gradient(180deg, rgba(247,239,226,0.08), rgba(247,239,226,0.34) 58%, rgba(247,239,226,1))",
};

export const DARK_BASE_ATMOSPHERE: Omit<ThemeAtmosphere, "sky" | "glow"> = {
  cloudColor: "rgba(255, 255, 255, 0.8)",
  cloudOpacity: 0.16,
  dimColor: "rgba(9, 9, 11, 1)",
  dimOpacity: 0,
  fogColor: "rgba(255, 255, 255, 0.3)",
  fogOpacity: 0,
  rainColor: "rgba(255, 255, 255, 0.7)",
  rainOpacity: 0,
  rippleColor: "rgba(255, 255, 255, 0.15)",
  starColor: "rgba(255, 255, 255, 1)",
  starOpacity: 0,
  orb: "radial-gradient(circle at 35% 35%, #fff7d1 0%, #ffcf73 52%, #ffad44 100%)",
  orbShadow: "0 0 54px rgba(255,176,46,0.24), 0 0 110px rgba(255,207,125,0.12)",
  orbOpacity: 0.42,
  moonCutoutColor: "rgba(26, 30, 48, 0.35)",
  lightning: "radial-gradient(circle at 62% 22%, rgba(225,232,242,0.35), transparent 34%)",
  particleColor: "rgba(255, 255, 255, 0.025)",
  shootingStar: "linear-gradient(90deg, rgba(255,255,255,0.45), transparent)",
  contentWash:
    "linear-gradient(180deg, rgba(247,239,226,0.1), rgba(247,239,226,0.2) 58%, var(--background))",
};
