"use client";
import { motion } from "framer-motion";
import { Globe, Server } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: "01",
    title: "Full-Stack Development",
    icon: <Server className="w-8 h-8" />,
    description: "Building complete end-to-end platforms, connecting beautiful interfaces with robust and secure backend systems.",
    tag: "Full-Stack",
  },
  {
    id: "02",
    title: "Backend Development",
    icon: <Globe className="w-8 h-8" />,
    description: "Building robust, scalable, and secure backend systems tailored to your business needs.",
    tag: "Backend",
  }
];

const Services = () => {
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  return (
    <section id="services" className="bg-background py-24 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header matching Experience section */}
        <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between pb-10 md:pb-12 gap-6">
          <div className="space-y-4">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
              What I Do.
            </span>

            <h2 className="text-[clamp(40px,8vw,120px)] font-medium tracking-tighter text-black dark:text-white leading-none">
              Services
              <span className="text-primary italic">
                .
              </span>
            </h2>
          </div>

          <p className="max-w-[300px] text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-snug font-light">
            Delivering end-to-end robust solutions. From fluid interfaces to scalable backends. <span className="text-primary font-semibold italic">Let's build something together.</span>
          </p>
        </header>

        {/* Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-primary dark:bg-white/5 border border-neutral-200 dark:border-neutral-800/50 rounded-[2rem] p-10 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                
                {/* Top: Icon & Number */}
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <span className="text-4xl font-serif italic text-neutral-300 dark:text-neutral-700 transition-colors duration-500">
                    {service.id}
                  </span>
                </div>

                {/* Bottom: Text & Details */}
                <div className="space-y-6">
                  <div>
                    <div className="inline-block px-3 py-1 mb-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {service.tag}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-white dark:text-white mb-3 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-white dark:text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

              </div>
              
              

            </motion.div>
          ))}
        </div>
      </div>

      {/* The Interaction Marquee */}
      <div
  className="relative py-10 mt-28 border-y border-zinc-200 dark:border-neutral-800 overflow-hidden cursor-default group"
  onMouseEnter={() => setIsMarqueeHovered(true)}
  onMouseLeave={() => setIsMarqueeHovered(false)}
>
  {/* Left Fade */}
  <div className="pointer-events-none absolute left-0 top-0 h-full w-32 
    bg-gradient-to-r from-background to-transparent z-10" />

  {/* Right Fade */}
  <div className="pointer-events-none absolute right-0 top-0 h-full w-32 
    bg-gradient-to-l from-background to-transparent z-10" />

  {/* Marquee */}
  <motion.div
    animate={{ x: "-50%" }}
    transition={{
      duration: isMarqueeHovered ? 18 : 35,
      repeat: Infinity,
      ease: "linear",
    }}
    className="flex whitespace-nowrap gap-16 items-center"
  >
    {[...Array(8)].map((_, i) => (
      <h3
        key={i}
        className="text-4xl md:text-6xl font-black uppercase tracking-tight 
        text-transparent [-webkit-text-stroke:1px_black] dark:[-webkit-text-stroke:1px_white]
        opacity-20 group-hover:opacity-60
        leading-none 
        transition-all duration-300"
      >
        <span className="relative">
          Available for Work

          {/* Accent underline */}
          <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
        </span>

        <span className="mx-6 text-primary/30">•</span>

        <span>New Projects</span>

        <span className="mx-6 text-primary/30">•</span>

        <span>Let's Collaborate</span>
      </h3>
    ))}
  </motion.div>

  {/* Subtle top highlight line */}
  <div className="absolute top-0 left-0 w-full h-[1px] 
    bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

  {/* Subtle bottom highlight line */}
  <div className="absolute bottom-0 left-0 w-full h-[1px] 
    bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
</div>
    </section>
  );
};

export default Services;