"use client";

import { motion } from "framer-motion";
import { colorMap, workingProcessSteps } from "@/config/data";
import { ProcessConnector } from "./ProcessConnector";

type ProcessStep = (typeof workingProcessSteps)[number];

type ProcessStepCardProps = {
  index: number;
  step: ProcessStep;
};

export const ProcessStepCard = ({ index, step }: ProcessStepCardProps) => {
  const theme = colorMap[step.color];
  const isEven = index % 2 === 1;

  return (
    <div className={`relative pl-16 md:pl-0 ${isEven ? "md:mt-32" : "md:-mt-16 first:mt-0"}`}>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", delay: 0.2 }}
        className="absolute left-0 top-6 w-14 flex justify-center md:hidden"
      >
        <div className="w-4 h-4 rounded-full bg-primary z-10 box-content border-4 border-white dark:border-zinc-950" />
      </motion.div>

      <ProcessConnector index={index} />

      <motion.div
        initial={{ opacity: 0, y: 60, rotate: isEven ? 10 : -10 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
        className="relative group w-full max-w-sm mx-auto md:max-w-none"
      >
        <div
          className={`absolute inset-0 ${theme.shadowLayer} rounded-3xl shadow-xl transition-transform duration-500 ${
            isEven ? "rotate-3 group-hover:rotate-6" : "-rotate-3 group-hover:-rotate-6"
          }`}
          style={{ zIndex: -1 }}
        />

        <div className={`relative ${theme.cardBg} ${theme.border} border rounded-3xl p-8 sm:p-10 shadow-lg transition-colors duration-300`}>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.6, delay: 0.3 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 drop-shadow-md"
          >
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.pin} shadow-inner border border-white/40 dark:border-white/10`}
              style={{ boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.2), 0 4px 6px -1px rgba(0,0,0,0.1)" }}
            />
            <div className="w-1.5 h-4 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-400 dark:to-zinc-500 rounded-b-sm shadow-sm" />
            <div className="w-2 h-1 bg-black/10 dark:bg-black/40 rounded-[100%] blur-[1px] mt-0.5" />
          </motion.div>

          <div className="flex flex-col h-full">
            <div className="mb-6">
              <span className={`${theme.textHighlight} text-xl sm:text-2xl font-serif italic tracking-wide opacity-80 backdrop-blur-sm px-3 py-1 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50`}>
                {step.id}
              </span>
            </div>
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
};
