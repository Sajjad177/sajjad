"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Banner = () => {
  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#f7efe2] dark:bg-[#1a1a1a] transition-colors duration-300">
      
      {/* 1. Top Greeting */}
      <motion.div 
        {...fadeInUp}
        className="flex items-center gap-2 mb-4 text-zinc-800 dark:text-zinc-200 text-lg md:text-xl font-medium"
      >
        <span>👋, my name is Sajjad Hossain and I am a</span>
      </motion.div>

      {/* 2. Hero Headline & Image Container */}
      <div className="relative flex flex-col items-center w-full max-w-7xl">
        
        {/* Solid Text (Top Layer) */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter text-black dark:text-white z-10"
        >
          Full Stack Developer
        </motion.h1>

        {/* Floating Arrow Icon */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[38%] top-[25%] z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-sm"
        >
          <ArrowUpRight className="w-6 h-6 text-black dark:text-white" />
        </motion.div>

        {/* Portrait Image Layer */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-[50%] md:top-[48%] w-[300px] md:w-[450px] z-20"
        >
          <img 
            src="/images/user-2.jpeg" // Path to your transparent B&W PNG
            alt="Portrait"
            className="w-full h-auto grayscale"
          />
          {/* Bottom fade for the image */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-[#050505] to-transparent z-30 pointer-events-none" />
        </motion.div>

        {/* Outline Text (Bottom Layer) */}
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter text-transparent z-0 mt-[-2rem] [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_white]"
        >
          & Photographer
        </motion.h1>
      </div>

      {/* 3. Location and Brand Logos */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-end mt-12 z-30 px-6">
        <motion.p {...fadeInUp} className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
          Dhaka, Bangladesh
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-2 mt-6 md:mt-0 text-base md:text-lg font-medium tracking-wide text-zinc-600 dark:text-zinc-400 text-right"
        >
          <p>Email: sajjadhossainx06@gmail.com</p>
          <p>Phone: 01907488316</p>
        </motion.div>
      </div>

      {/* 4. Bottom Call-to-Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-72 z-30">
        <Button 
          className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-8 py-6 text-lg rounded-md transition-transform hover:scale-105"
        >
          You need a designer
        </Button>
        <Button 
          variant="outline" 
          className="border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 px-8 py-6 text-lg rounded-md transition-transform hover:scale-105 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          You need a photographer
        </Button>
      </div>

    </section>
  );
};

export default Banner;