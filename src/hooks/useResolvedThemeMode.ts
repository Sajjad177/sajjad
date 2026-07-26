"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { ThemeMode } from "@/types";

export const useResolvedThemeMode = (): ThemeMode => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return isMounted && resolvedTheme === "dark" ? "dark" : "light";
};
