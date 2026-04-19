"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeTransitionContextType {
  triggerThemeChange: () => void;
  isAnimating: boolean;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined);

export const useThemeTransition = () => {
  const context = useContext(ThemeTransitionContext);
  if (!context) {
    throw new Error("useThemeTransition must be used within a ThemeTransitionProvider");
  }
  return context;
};

export const ThemeTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerThemeChange = () => {
    if (isAnimating) return; 
    
    const isDark = resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    
    setTargetTheme(nextTheme);
    setIsAnimating(true);

    setTimeout(() => {
      setTheme(nextTheme);
    }, 1500);

    setTimeout(() => {
      setIsAnimating(false);
      setTargetTheme(null);
    }, 3200); 
  };

  const goingDark = targetTheme === "dark";

  // Environmental Colors
  const darkCol = "#0f172a"; // Deep navy / charcoal
  const lightCol = "#fffaf0"; // Warm, natural daylight (floral white)

  return (
    <ThemeTransitionContext.Provider value={{ triggerThemeChange, isAnimating }}>
      {children}

      <AnimatePresence>
        {mounted && isAnimating && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto"
            initial={{ 
                opacity: 0, 
                background: goingDark ? lightCol : darkCol 
            }}
            animate={{ 
                opacity: [0, 1, 1, 1, 0], 
                background: [
                    goingDark ? lightCol : darkCol,
                    goingDark ? "#1e293b" : "#ffedd5", // Mid transition
                    goingDark ? darkCol : lightCol, // Settled
                    goingDark ? darkCol : lightCol,
                ]
            }}
            transition={{
                duration: 3.2,
                times: [0, 0.15, 0.5, 0.85, 1], 
                ease: "easeInOut"
            }}
          >
            {/* Atmospheric Depth & Glowing Diffusion Overlay */}
            <motion.div 
               className="absolute inset-0 pointer-events-none"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
            >
               <div className={`absolute bottom-0 w-full h-[50vh] bg-gradient-to-t ${goingDark ? 'from-indigo-900/40' : 'from-orange-200/40'} to-transparent`} />
            </motion.div>

            {/* --- SUNRISE (Dark to Light) --- */}
            {!goingDark && (
              <>
                {/* Sun rising along curve */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ x: "-60vw", y: "80vh" }}
                  animate={{ x: "0vw", y: "-10vh" }}
                  // X moves linearly while Y decelerates -> produces a flawless quarter-circle rising arc!
                  transition={{
                    x: { duration: 3.2, ease: "linear" },
                    y: { duration: 3.2, ease: "easeOut" }
                  }}
                >
                   <div className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96">
                       {/* Warm, glowing diffusion (No harsh blues) */}
                       <div className="absolute inset-[-50%] bg-[#ffedd5] rounded-full blur-[80px] opacity-70" />
                       <div className="absolute inset-[-10%] bg-orange-200 rounded-full blur-[40px] opacity-90" />
                       <div className="absolute inset-[15%] bg-gradient-to-t from-orange-100 to-white rounded-full blur-[5px]" />
                       <div className="absolute inset-[25%] bg-white rounded-full opacity-100 shadow-[0_0_80px_20px_rgba(255,255,255,1)]" />
                   </div>
                </motion.div>
              </>
            )}

            {/* --- SUNSET (Light to Dark) --- */}
            {goingDark && (
              <>
                {/* Sun setting slowly */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ x: "0vw", y: "-10vh", opacity: 1 }}
                  animate={{ x: "60vw", y: "80vh", opacity: 0 }}
                  // X moves linearly while Y accelerates -> arc curving downwards
                  transition={{
                    x: { duration: 3.2, ease: "linear" },
                    y: { duration: 3.2, ease: "easeIn" },
                    opacity: { duration: 2.5, ease: "easeIn" }
                  }}
                >
                   <div className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96">
                       <div className="absolute inset-[-50%] bg-[#ffedd5] rounded-full blur-[80px] opacity-40" />
                       <div className="absolute inset-[15%] bg-gradient-to-t from-orange-200 to-red-100 rounded-full blur-[5px]" />
                       <div className="absolute inset-[25%] bg-orange-50 rounded-full opacity-90" />
                   </div>
                </motion.div>

                {/* Moon rising behind it */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ x: "-60vw", y: "80vh" }}
                  animate={{ x: "0vw", y: "-10vh" }}
                  // Rising arc identically matched!
                  transition={{
                    x: { duration: 3.2, ease: "linear" },
                    y: { duration: 3.2, ease: "easeOut" }
                  }}
                >
                   <div className="relative flex items-center justify-center w-48 h-48 md:w-72 md:h-72">
                       <div className="absolute inset-[-40%] bg-indigo-900/30 rounded-full blur-[60px]" />
                       <div className="absolute inset-0 bg-slate-300 rounded-full blur-[2px] opacity-90 shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.6)]" />
                       {/* Craters */}
                       <div className="absolute top-[20%] left-[25%] w-[15%] h-[15%] bg-slate-400 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)]" />
                       <div className="absolute top-[50%] left-[15%] w-[25%] h-[25%] bg-slate-400 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)]" />
                       <div className="absolute top-[35%] right-[25%] w-[10%] h-[10%] bg-slate-400 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)]" />
                   </div>
                </motion.div>

                {/* Starfield atmospheric particles */}
                <motion.div
                   className="absolute inset-0 pointer-events-none"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: [0, 0, 1, 1] }}
                   transition={{ duration: 3.2, times: [0, 0.3, 0.7, 1] }}
                >
                   {[...Array(60)].map((_, i) => {
                     const top = (i * 17) % 100;
                     const left = (i * 23) % 100;
                     const size = (i % 3) + 1;
                     const delay = (i % 5) * 0.4;
                     
                     return (
                       <motion.div
                         key={i}
                         className="absolute bg-indigo-50 rounded-full"
                         style={{
                             top: `${top}%`,
                             left: `${left}%`,
                             width: `${size}px`,
                             height: `${size}px`,
                         }}
                         animate={{ opacity: [0.1, 0.8, 0.1] }}
                         transition={{ duration: 2 + (i % 3), delay, repeat: Infinity, ease: "easeInOut" }}
                       />
                     );
                   })}
                </motion.div>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </ThemeTransitionContext.Provider>
  );
};
