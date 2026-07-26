"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/types";

type ProjectImageModalProps = {
  currentImageIndex: number;
  isOpen: boolean;
  project: Project;
  onClose: () => void;
};

export const ProjectImageModal = ({
  currentImageIndex,
  isOpen,
  project,
  onClose,
}: ProjectImageModalProps) => {
  const imageSrc = project.image?.[currentImageIndex];

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 cursor-zoom-out p-4 md:p-12"
        onClick={onClose}
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors z-[101]"
        >
          <X className="w-8 h-8 md:w-10 md:h-10" />
        </button>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full h-full relative"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};
