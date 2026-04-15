"use client"

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Requirement Discussion',
    description: 'We address key problems directly in the headline. Understand your goals and capture requirements.',
    color: 'orange',
  },
  {
    id: '02',
    title: 'Planning & Architecture',
    description: 'Showcase the main benefits of your product. Each requirement mapped gracefully into system architecture.',
    color: 'blue',
  },
  {
    id: '03',
    title: 'Development',
    description: 'We build your product using standard guidelines. Writing clean, scalable code for maximum value.',
    color: 'purple',
  },
  {
    id: '04',
    title: 'Testing',
    description: 'List core functionalities clearly. Connect features to rigorous quality testing and security checks.',
    color: 'rose',
  },
  {
    id: '05',
    title: 'Deployment',
    description: 'Finalizing the setup and pushing it live. A seamless transition into the production environment.',
    color: 'emerald',
  },
];

interface ColorTheme {
  border: string;
  shadowLayer: string;
  textHighlight: string;
  pin: string;
  cardBg: string;
}

const colorMap: Record<string, ColorTheme> = {
  orange: {
    border: 'border-orange-100 dark:border-orange-900/30',
    shadowLayer: 'bg-[#FFF9F0] dark:bg-orange-950/20',
    textHighlight: 'text-orange-500 dark:text-orange-400',
    pin: 'from-orange-400 to-orange-600 shadow-orange-500/30',
    cardBg: 'bg-white dark:bg-zinc-900',
  },
  blue: {
    border: 'border-blue-100 dark:border-blue-900/30',
    shadowLayer: 'bg-[#F0F6FF] dark:bg-blue-950/20',
    textHighlight: 'text-blue-500 dark:text-blue-400',
    pin: 'from-blue-400 to-blue-600 shadow-blue-500/30',
    cardBg: 'bg-white dark:bg-zinc-900',
  },
  purple: {
    border: 'border-purple-100 dark:border-purple-900/30',
    shadowLayer: 'bg-[#F8F0FF] dark:bg-purple-950/20',
    textHighlight: 'text-purple-500 dark:text-purple-400',
    pin: 'from-purple-400 to-purple-600 shadow-purple-500/30',
    cardBg: 'bg-white dark:bg-zinc-900',
  },
  rose: {
    border: 'border-rose-100 dark:border-rose-900/30',
    shadowLayer: 'bg-[#FFF0F2] dark:bg-rose-950/20',
    textHighlight: 'text-rose-500 dark:text-rose-400',
    pin: 'from-rose-400 to-rose-600 shadow-rose-500/30',
    cardBg: 'bg-white dark:bg-zinc-900',
  },
  emerald: {
    border: 'border-emerald-100 dark:border-emerald-900/30',
    shadowLayer: 'bg-[#F0FDF4] dark:bg-emerald-950/20',
    textHighlight: 'text-emerald-500 dark:text-emerald-400',
    pin: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30',
    cardBg: 'bg-white dark:bg-zinc-900',
  },
};

const Connector = ({ index }: { index: number }) => {
  const isLeft = index % 2 === 0;
  
  if (index === steps.length - 1) return null;

  return (
    <svg 
      className={`hidden md:block absolute top-[45%] w-[130%] h-[180%] pointer-events-none -z-10 ${
        isLeft ? 'left-[45%]' : 'right-[45%] scale-x-[-1]'
      }`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path 
        d="M 10,10 L 90,90" 
        fill="none" 
        stroke="currentColor" 
        vectorEffect="non-scaling-stroke"
        className="text-zinc-300 dark:text-zinc-600"
        strokeWidth="2" 
        strokeDasharray="8 8"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        transition={{ duration: 1, ease: "linear", delay: 0.4 }}
      />
    </svg>
  );
};

export default function WorkingProcess() {
  const containerRef = useRef(null);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-[#f7efe2] dark:bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between pb-10 md:pb-12 gap-6 relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
              How I Work
            </span>

            <h2 className="text-[clamp(40px,8vw,120px)] font-medium tracking-tighter text-black dark:text-white leading-none">
              Process
              <span className="text-[#235347] dark:text-[#4a8b7a] italic">.</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[300px] text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-snug font-light"
          >
            A structured, professional approach from initial planning to the final deployment.
          </motion.p>
        </header>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Mobile Central Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="absolute left-[27px] top-4 border-l-2 border-dashed border-zinc-200 dark:border-zinc-800 md:hidden origin-top" 
          />

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 md:gap-x-24">
            {steps.map((step, index) => {
              const theme = colorMap[step.color];
              const isEven = index % 2 === 1;
              
              return (
                <div 
                  key={step.id}
                  className={`relative pl-16 md:pl-0 ${isEven ? 'md:mt-32' : 'md:-mt-16 first:mt-0'}`}
                >
                  {/* Mobile timeline dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="absolute left-0 top-6 w-14 flex justify-center md:hidden"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#235347] dark:bg-zinc-700 z-10 box-content border-4 border-white dark:border-zinc-950" />
                  </motion.div>

                  <Connector index={index} />

                  <motion.div 
                    initial={{ opacity: 0, y: 60, rotate: isEven ? 10 : -10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                    className="relative group w-full max-w-sm mx-auto md:max-w-none"
                  >
                    {/* Shadow Stack Layer */}
                    <div 
                      className={`absolute inset-0 ${theme.shadowLayer} rounded-3xl shadow-xl transition-transform duration-500 ${
                        isEven ? 'rotate-3 group-hover:rotate-6' : '-rotate-3 group-hover:-rotate-6'
                      }`} 
                      style={{ zIndex: -1 }} 
                    />
                    
                    {/* Main Content Card */}
                    <div className={`relative ${theme.cardBg} ${theme.border} border rounded-3xl p-8 sm:p-10 shadow-lg transition-colors duration-300`}>
                        
                        {/* 3D Pin Animation */}
                        <motion.div 
                           initial={{ y: -50, opacity: 0 }}
                           whileInView={{ y: 0, opacity: 1 }}
                           viewport={{ once: true }}
                           transition={{ type: "spring", bounce: 0.6, delay: 0.3 }}
                           className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 drop-shadow-md"
                        >
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.pin} shadow-inner border border-white/40 dark:border-white/10`} 
                               style={{ boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.2), 0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                          <div className="w-1.5 h-4 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-400 dark:to-zinc-500 rounded-b-sm shadow-sm" />
                          {/* Pin Drop shadow on the paper */}
                          <div className="w-2 h-1 bg-black/10 dark:bg-black/40 rounded-[100%] blur-[1px] mt-0.5" />
                        </motion.div>

                        <div className="flex flex-col h-full">
                          {/* Card Number */}
                          <div className="mb-6">
                            <span className={`${theme.textHighlight} text-xl sm:text-2xl font-serif italic tracking-wide opacity-80 backdrop-blur-sm px-3 py-1 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50`}>
                              {step.id}
                            </span>
                          </div>
                          
                          {/* Card Content */}
                          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100 tracking-tight">
                            {step.title}
                          </h3>
                          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        
                    </div>
                  </motion.div>
                </div>
                
              );
            })}
          </div>
        </div>
      </div>      {/* The Interaction Marquee */}
      <div
        className="relative py-10 mt-28 border-y border-zinc-200 dark:border-neutral-800 overflow-hidden cursor-default group"
        onMouseEnter={() => setIsMarqueeHovered(true)}
        onMouseLeave={() => setIsMarqueeHovered(false)}
      >
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 
          bg-gradient-to-r from-[#f7efe2] to-transparent 
          dark:from-[#1a1a1a] z-10" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 
          bg-gradient-to-l from-[#f7efe2] to-transparent 
          dark:from-[#1a1a1a] z-10" />

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
                PLAN

                {/* Accent underline */}
                <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-[#235347] dark:bg-[#4a8b7a] group-hover:w-full transition-all duration-500" />
              </span>

              <span className="mx-6 text-[#235347]/30 dark:text-[#4a8b7a]/30">•</span>

              <span>BUILD</span>

              <span className="mx-6 text-[#235347]/30 dark:text-[#4a8b7a]/30">•</span>

              <span>TEST</span>

              <span className="mx-6 text-[#235347]/30 dark:text-[#4a8b7a]/30">•</span>

              <span>LAUNCH</span>

              <span className="mx-6 text-[#235347]/30 dark:text-[#4a8b7a]/30">•</span>

              <span>GROW</span>
              
              <span className="ml-6 text-[#235347]/30 dark:text-[#4a8b7a]/30">•</span>
            </h3>
          ))}
        </motion.div>

        {/* Subtle top highlight line */}
        <div className="absolute top-0 left-0 w-full h-[1px] 
          bg-gradient-to-r from-transparent via-[#235347]/20 to-transparent 
          dark:via-[#4a8b7a]/20" />

        {/* Subtle bottom highlight line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] 
          bg-gradient-to-r from-transparent via-[#235347]/20 to-transparent 
          dark:via-[#4a8b7a]/20" />
      </div>
    </section>
  );
}
