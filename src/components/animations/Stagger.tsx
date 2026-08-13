"use client";

import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { staggerChildren } from "@/config/animation";

type StaggerProps = PropsWithChildren<{ className?: string }>;

export const Stagger = ({ children, className }: StaggerProps) => (
  <motion.div
    className={className}
    variants={staggerChildren}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);
