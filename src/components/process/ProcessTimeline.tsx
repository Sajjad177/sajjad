"use client";

import { motion } from "framer-motion";
import { workingProcessSteps } from "@/config/data";
import { ProcessStepCard } from "./ProcessStepCard";

export const ProcessTimeline = () => (
  <div className="relative">
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
      className="absolute left-[27px] top-4 border-l-2 border-dashed border-zinc-200 dark:border-zinc-800 md:hidden origin-top"
    />

    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 md:gap-x-24">
      {workingProcessSteps.map((step, index) => (
        <ProcessStepCard key={step.id} step={step} index={index} />
      ))}
    </div>
  </div>
);
