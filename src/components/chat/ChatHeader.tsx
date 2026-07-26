"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { personalInfo } from "@/config/data";

type ChatHeaderProps = {
  onClose: () => void;
};

export const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="p-6 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#235347] to-[#4a8b7a] flex items-center justify-center p-0.5">
          <Image
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
            width={48}
            height={48}
            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#0a0a0a]"
            alt="Avatar"
          />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#0a0a0a] rounded-full"
        />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-black dark:text-white leading-tight">
          {personalInfo.name}
        </h3>
        <p className="text-xs text-black/50 dark:text-white/50 font-medium tracking-wide uppercase">
          {personalInfo.title}
        </p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
);
