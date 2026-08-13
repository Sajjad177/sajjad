"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { motionTokens } from "@/config/animation";

export const PortfolioIntro = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion || window.sessionStorage.getItem("portfolio-intro-seen")) return;

    const frame = window.requestAnimationFrame(() => setVisible(true));
    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem("portfolio-intro-seen", "true");
      setVisible(false);
    }, 900);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-background text-foreground"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.duration.normal }}
          aria-label="Loading portfolio"
          role="status"
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: motionTokens.duration.normal, ease: motionTokens.ease }}
          >
            <p className="font-title text-4xl font-semibold tracking-tight sm:text-5xl">SAJJAD</p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.35em] text-primary sm:text-xs">
              Full Stack Developer
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
