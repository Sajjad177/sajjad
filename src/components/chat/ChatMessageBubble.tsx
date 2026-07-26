"use client";

import { motion } from "framer-motion";
import type { ChatMessage } from "@/types";

type ChatMessageBubbleProps = {
  message: ChatMessage;
};

export const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => (
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
      scale: 0.9,
      transformOrigin: message.isBot ? "bottom left" : "bottom right",
    }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className={`max-w-[85%] p-4 text-[15px] leading-relaxed shadow-sm ${message.isBot ? "bg-white dark:bg-[#1a1a1a] text-black dark:text-white self-start rounded-[1.5rem] rounded-tl-sm border border-zinc-100 dark:border-zinc-800" : "bg-gradient-to-tr from-[#235347] to-[#4a8b7a] text-white self-end rounded-[1.5rem] rounded-tr-sm shadow-[0_5px_15px_rgba(35,83,71,0.2)]"}`}
  >
    {message.text.split("\n").map((line, index) => (
      <p key={index} className="whitespace-pre-wrap">
        {line}
      </p>
    ))}
  </motion.div>
);
