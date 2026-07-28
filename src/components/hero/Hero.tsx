"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
  const heroRef = useRef<HTMLElement>(null);
  const {
    atmosphere,
    weather,
    weatherExperience,
    enableWeatherExperience,
  } = useEnvironment();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const sceneProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });
  const heroContentY = useTransform(sceneProgress, [0, 1], [0, -34]);
  const heroContentOpacity = useTransform(sceneProgress, [0, 0.74, 1], [1, 0.92, 0.62]);
  const heroContentFilter = useTransform(
    sceneProgress,
    [0, 1],
    ["saturate(1)", "saturate(0.82)"]
  );
  const portraitSceneY = useTransform(sceneProgress, [0, 1], [0, -24]);
  const portraitSceneOpacity = useTransform(sceneProgress, [0, 0.78, 1], [1, 0.86, 0.5]);
  const portraitSceneFilter = useTransform(
    sceneProgress,
    [0, 1],
    ["saturate(1)", "saturate(0.78) blur(1px)"]
  );
  const portraitLighting = useMemo(() => {
    const lighting = {
      morning: {
        glow:
          "radial-gradient(circle at 48% 42%, rgba(255,211,135,0.26), rgba(255,190,88,0.1) 38%, transparent 66%)",
        rim: "drop-shadow(18px 0 22px rgba(255,185,84,0.2)) drop-shadow(-10px 10px 24px rgba(81,61,35,0.08))",
        shadow: "rgba(119, 83, 44, 0.2)",
        wash: "linear-gradient(112deg, rgba(255,216,157,0.18), transparent 42%, rgba(255,255,255,0.1))",
      },
      afternoon: {
        glow:
          "radial-gradient(circle at 50% 40%, rgba(255,246,218,0.22), rgba(172,213,229,0.09) 42%, transparent 68%)",
        rim: "drop-shadow(14px 0 20px rgba(255,255,255,0.16)) drop-shadow(-10px 12px 24px rgba(74,87,100,0.09))",
        shadow: "rgba(75, 76, 70, 0.16)",
        wash: "linear-gradient(112deg, rgba(255,255,255,0.16), transparent 44%, rgba(185,220,234,0.08))",
      },
      evening: {
        glow:
          "radial-gradient(circle at 54% 42%, rgba(255,153,86,0.25), rgba(160,117,169,0.1) 42%, transparent 68%)",
        rim: "drop-shadow(20px 0 24px rgba(255,132,64,0.22)) drop-shadow(-12px 12px 26px rgba(74,54,88,0.1))",
        shadow: "rgba(94, 55, 42, 0.22)",
        wash: "linear-gradient(112deg, rgba(255,151,82,0.16), transparent 42%, rgba(128,105,168,0.08))",
      },
      night: {
        glow:
          "radial-gradient(circle at 50% 42%, rgba(183,207,243,0.18), rgba(88,115,169,0.11) 42%, transparent 68%)",
        rim: "drop-shadow(16px 0 24px rgba(151,195,255,0.2)) drop-shadow(-12px 12px 26px rgba(4,8,20,0.2))",
        shadow: "rgba(0, 8, 24, 0.24)",
        wash: "linear-gradient(112deg, rgba(166,201,255,0.12), transparent 42%, rgba(20,30,55,0.14))",
      },
    };

    return lighting[atmosphere.phase];
  }, [atmosphere.phase]);
  const isDenseWeather =
    weather === "rain" ||
    weather === "drizzle" ||
    weather === "thunderstorm" ||
    weather === "fog" ||
    weather === "mist";

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-background pt-24 pb-10 transition-colors duration-300 md:pt-32"
    >
      <HeroBackground
        atmosphere={atmosphere}
        scrollProgress={sceneProgress}
        weather={weather}
      />

      <Greeting
        atmosphere={atmosphere}
        weatherExperience={weatherExperience}
        onEnableWeather={enableWeatherExperience}
      />

      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity, filter: heroContentFilter }}
        className="relative z-30 mb-4 flex items-center gap-2 px-4 text-center text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:text-base md:text-xl"
      >
        <motion.span {...fadeInUp}>
          👋Hi, my name is {personalInfo.name} and I am a
        </motion.span>
      </motion.div>

      <motion.div
        className="relative z-20 flex w-full max-w-7xl flex-col items-center"
        style={{ y: heroContentY, opacity: heroContentOpacity, filter: heroContentFilter }}
      >
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
          style={{ y: portraitSceneY, opacity: portraitSceneOpacity, filter: portraitSceneFilter }}
          className="absolute top-[55%] z-20 w-[200px] sm:top-[52%] sm:w-[260px] md:top-[48%] md:w-[450px]"
        >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            className="pointer-events-none absolute inset-x-[-20%] top-[-10%] h-[86%] rounded-full blur-3xl"
            initial={false}
            animate={{
              background: portraitLighting.glow,
              opacity: isDenseWeather ? 0.34 : 0.58,
            }}
            transition={{ duration: 3.5, ease: "easeOut" }}
          />
          <motion.div
            className="pointer-events-none absolute inset-x-[12%] bottom-[1%] h-9 rounded-full blur-xl md:h-14"
            initial={false}
            animate={{
              backgroundColor: portraitLighting.shadow,
              opacity: isDenseWeather ? 0.28 : 0.44,
              scaleX: isDenseWeather ? 0.9 : 1,
            }}
            transition={{ duration: 3.5, ease: "easeOut" }}
          />
          <Image
            src="/images/sajjad.png"
            alt="Portrait"
            width={450}
            height={450}
            className="relative z-10 h-auto w-full"
            style={{ filter: portraitLighting.rim }}
            priority
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
            initial={false}
            animate={{ background: portraitLighting.wash, opacity: isDenseWeather ? 0.42 : 0.62 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
          />
          <div className="pointer-events-none absolute inset-x-[-8%] bottom-[-2%] z-20 h-24 bg-gradient-to-t from-background via-background/60 to-transparent md:h-36" />
          <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-20 w-full bg-gradient-to-t from-background to-transparent md:h-32" />
        </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="z-30 mt-[180px] flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:mt-[220px] md:mt-[380px] md:flex-row md:items-end"
        style={{ y: heroContentY, opacity: heroContentOpacity, filter: heroContentFilter }}
      >
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
      </motion.div>
    </section>
  );
};
