"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { personalInfo, socialLinks } from "@/config/data";

const Banner = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const },
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center pt-24 md:pt-32 pb-10 overflow-hidden bg-background transition-colors duration-300">
      {/* Greeting */}
      <motion.div
        {...fadeInUp}
        className="flex items-center gap-2 mb-4 text-zinc-800 dark:text-zinc-200 text-sm sm:text-base md:text-xl font-medium text-center px-4"
      >
        <span>👋Hi, my name is {personalInfo.name} and I am a</span>
      </motion.div>

      {/* Hero Container */}
      <div className="relative flex flex-col items-center w-full max-w-7xl">
        {/* Top Text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter text-black dark:text-white z-10 text-center"
        >
          {personalInfo.title}
        </motion.h1>

        {/* Arrow */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[60%] sm:left-[55%] md:left-[38%] top-[20%] md:top-[55%] z-30 hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-sm"
        >
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-black dark:text-white" />
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-[55%] sm:top-[52%] md:top-[48%] w-[200px] sm:w-[260px] md:w-[450px] z-20"
        >
          <Image
            src="/images/sajjad.png"
            alt="Portrait"
            width={450}
            height={450}
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-0 w-full h-20 md:h-32 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
        </motion.div>

        {/* Bottom Stroke Text */}
        {/* <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[clamp(40px,12vw,160px)] font-black leading-none tracking-tighter text-transparent z-0 mt-[-1rem] md:mt-[-2rem] text-center [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_white]"
        >
          & UI, UX Designer
        </motion.h1> */}
      </div>

      {/* Bottom Info */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-end mt-[180px] sm:mt-[220px] md:mt-[380px] z-30 px-6 gap-4">
        <motion.p
          {...fadeInUp}
          className="text-zinc-500 dark:text-zinc-400 font-medium text-base md:text-lg text-center md:text-left"
        >
          {personalInfo.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center md:items-end gap-1 md:gap-2 text-sm md:text-lg font-medium tracking-wide text-zinc-600 dark:text-zinc-400 text-center md:text-right"
        >
          <p>Email: {personalInfo.email}</p>
          <p>Phone: {personalInfo.phone}</p>
          <div className="flex gap-4 mt-2">
            {socialLinks.filter(link => link.name !== 'Instagram').map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
