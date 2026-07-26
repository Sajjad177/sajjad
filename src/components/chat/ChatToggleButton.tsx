"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

type ChatToggleButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const ChatToggleButton = ({ isOpen, onToggle }: ChatToggleButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onToggle}
    className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#235347] to-[#4a8b7a] text-white shadow-[0_10px_40px_rgba(35,83,71,0.5)] flex items-center justify-center z-50 overflow-hidden group"
  >
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="relative z-10"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
          >
            <X className="w-7 h-7" />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
          >
            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    <AnimatePresence>
      {!isOpen && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#235347] z-20 shadow-lg"
        />
      )}
    </AnimatePresence>
  </motion.button>
);
