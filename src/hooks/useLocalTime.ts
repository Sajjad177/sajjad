"use client";

import { useEffect, useState } from "react";
import { LOCAL_TIME_REFRESH_INTERVAL } from "@/constants";
import type { TimeAtmosphere } from "@/types";
import {
  calculateLocalTimeAtmosphere,
  INITIAL_TIME_ATMOSPHERE,
} from "@/utils";

export const useLocalTime = (): TimeAtmosphere => {
  const [atmosphere, setAtmosphere] = useState(INITIAL_TIME_ATMOSPHERE);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAtmosphere(calculateLocalTimeAtmosphere(new Date()));
    });
    const timer = window.setInterval(() => {
      setAtmosphere(calculateLocalTimeAtmosphere(new Date()));
    }, LOCAL_TIME_REFRESH_INTERVAL);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  return atmosphere;
};
