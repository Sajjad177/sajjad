"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { personalInfo, socialLinks } from "@/config/data";
import { useEnvironment } from "@/hooks";
import { Greeting } from "./Greeting";
import { HeroBackground } from "./HeroBackground";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export const Hero = () => {
  const {
    atmosphere,
    weather,
    weatherExperience,
    enableWeatherExperience,
  } = useEnvironment();

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-background pt-24 pb-10 transition-colors duration-300 md:pt-32">
      <HeroBackground atmosphere={atmosphere} weather={weather} />

      <Greeting
        atmosphere={atmosphere}
        weatherExperience={weatherExperience}
        onEnableWeather={enableWeatherExperience}
      />

      <motion.div
        {...fadeInUp}
        className="relative z-30 mb-4 flex items-center gap-2 px-4 text-center text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base md:text-xl"
      >
        <span>👋Hi, my name is {personalInfo.name} and I am a</span>
      </motion.div>

      <div className="relative z-20 flex w-full max-w-7xl flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className="z-10 whitespace-nowrap text-center text-[12vw] font-black leading-none tracking-tighter text-foreground sm:text-[9vw] md:text-[6.5rem] lg:text-[8rem]"
        >
          {personalInfo.title}
        </motion.h1>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[60%] top-[20%] z-30 hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-black sm:left-[55%] sm:flex md:left-[38%] md:top-[55%] md:h-12 md:w-12"
        >
          <ArrowUpRight className="h-5 w-5 text-black dark:text-white md:h-6 md:w-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-[55%] z-20 w-[200px] sm:top-[52%] sm:w-[260px] md:top-[48%] md:w-[450px]"
        >
          <Image
            src="/images/sajjad.png"
            alt="Portrait"
            width={450}
            height={450}
            className="h-auto w-full"
          />
          <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-20 w-full bg-gradient-to-t from-background to-transparent md:h-32" />
        </motion.div>
      </div>

      <div className="z-30 mt-[180px] flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:mt-[220px] md:mt-[380px] md:flex-row md:items-end">
        <motion.p
          {...fadeInUp}
          className="text-center text-base font-medium text-zinc-500 dark:text-zinc-400 md:text-left md:text-lg"
        >
          {personalInfo.location}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-1 text-center text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-400 md:items-end md:gap-2 md:text-right md:text-lg"
        >
          <p>Email: {personalInfo.email}</p>
          <p>Phone: {personalInfo.phone}</p>
          <div className="mt-2 flex gap-4">
            {socialLinks
              .filter((link) => link.name !== "Instagram")
              .map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 transition-colors hover:text-primary"
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
