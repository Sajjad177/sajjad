"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types";

type ProjectImageGalleryProps = {
  currentImageIndex: number;
  project: Project;
  onOpenModal: () => void;
};

export const ProjectImageGallery = ({
  currentImageIndex,
  project,
  onOpenModal,
}: ProjectImageGalleryProps) => (
  <div
    onClick={onOpenModal}
    className="relative w-full aspect-[21/9] bg-zinc-200 dark:bg-zinc-900 rounded-[2rem] overflow-hidden mb-32 border border-zinc-200 dark:border-zinc-800 cursor-zoom-in"
  >
    <AnimatePresence>
      <motion.img
        key={currentImageIndex}
        src={project.image?.[currentImageIndex]}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
      />
    </AnimatePresence>
  </div>
);
