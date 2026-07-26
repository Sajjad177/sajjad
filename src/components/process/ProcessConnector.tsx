"use client";

import { motion } from "framer-motion";
import { workingProcessSteps } from "@/config/data";

type ProcessConnectorProps = {
  index: number;
};

export const ProcessConnector = ({ index }: ProcessConnectorProps) => {
  const isLeft = index % 2 === 0;

  if (index === workingProcessSteps.length - 1) return null;

  return (
    <svg
      className={`hidden md:block absolute top-[45%] w-[130%] h-[180%] pointer-events-none -z-10 ${
        isLeft ? "left-[45%]" : "right-[45%] scale-x-[-1]"
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
