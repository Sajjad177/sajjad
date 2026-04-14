"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "link" | "text">("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Main Cursor Spring
  const springConfig = { damping: 30, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Background Aura Spring (slower dragging effect)
  const auraSpringConfig = { damping: 40, stiffness: 60, mass: 1 };
  const auraX = useSpring(mouseX, auraSpringConfig);
  const auraY = useSpring(mouseY, auraSpringConfig);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return; 
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (!target) return;

      const tagName = target.tagName.toLowerCase();
      // Expanded clickable check mapping
      const isClickable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        tagName === "a" || tagName === "button" || 
        target.closest("a") || target.closest("button");
      
      const isText = tagName === "p" || tagName === "h1" || tagName === "h2" || tagName === "h3" || tagName === "span";

      if (isClickable) {
        setHoverState("link");
      } else if (isText) {
        setHoverState("text");
      } else {
        setHoverState("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-white pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden shadow-2xl"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverState === "link" ? 64 : hoverState === "text" ? 4 : 16,
          height: hoverState === "link" ? 64 : hoverState === "text" ? 32 : 16,
          borderRadius: hoverState === "text" ? "2px" : "9999px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <AnimatePresence>
          {hoverState === "link" && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              {/* <ArrowUpRight className="w-6 h-6 text-black" strokeWidth={3} /> */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Slowly dragging Trailing Aura effect */}
      <motion.div
        className="fixed top-0 left-0 w-48 h-48 bg-black/5 dark:bg-white/5 rounded-full pointer-events-none z-[9998] blur-2xl"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverState === "link" ? 1.5 : 1,
          opacity: hoverState === "link" ? 0.8 : 0.4
        }}
      />
    </>
  );
};

export default CustomCursor;
