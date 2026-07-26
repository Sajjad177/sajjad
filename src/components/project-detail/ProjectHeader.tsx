"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Globe } from "lucide-react";
import type { Project } from "@/types";

type ProjectHeaderProps = {
  project: Project;
  onBack: () => void;
};

export const ProjectHeader = ({ project, onBack }: ProjectHeaderProps) => {
  const [firstTitleWord, ...remainingTitle] = project.title.split(" ");

  return (
    <>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-20"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
          Gallery Archive
        </span>
      </button>

      <header className="mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-zinc-300 dark:border-zinc-800 rounded-full dark:text-zinc-400">
            {project.year}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-[#235347] text-white rounded-full">
            {project.category}
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[clamp(40px,10vw,120px)] font-medium tracking-tighter leading-[0.9] text-black dark:text-white mb-10"
        >
          {firstTitleWord} <br />
          <span className="italic text-[#235347] dark:text-[#4a8b7a]">
            {remainingTitle.join(" ")}
          </span>
        </motion.h1>
        <div className="flex flex-wrap gap-8 items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="flex gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                Role
              </p>
              <p className="font-medium dark:text-white">{project.role}</p>
            </div>
          </div>
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#235347] dark:text-[#4a8b7a] cursor-pointer"
          >
            <span className="relative">
              Live Preview
              <motion.span
                variants={{ rest: { width: "0%" }, hover: { width: "100%" } }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 -bottom-0.5 h-[1.5px] bg-current"
              />
            </span>
            <motion.span
              variants={{ rest: { x: 0, opacity: 0.7 }, hover: { x: 4, opacity: 1 } }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <Globe className="w-4 h-4 animate-bounce" />
            </motion.span>
          </motion.a>
        </div>
      </header>
    </>
  );
};
