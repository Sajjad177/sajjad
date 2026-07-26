"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-orange-400 to-amber-500" />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
            title="Close Modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center text-center mt-4">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.1, duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
            <p className="text-zinc-400 mb-8 font-light">
              {`Thank you for reaching out. I've received your message and will get back to you as
              soon as possible.`}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-4 bg-primary text-black font-semibold rounded-full hover:bg-orange-400 transition-colors"
            >
              Close & Continue
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
