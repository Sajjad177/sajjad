"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import type { ChatMessage } from "@/types";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { TypingIndicator } from "./TypingIndicator";

type ChatPanelProps = {
  endRef: RefObject<HTMLDivElement | null>;
  inputValue: string;
  isTyping: boolean;
  messages: ChatMessage[];
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export const ChatPanel = ({
  endRef,
  inputValue,
  isTyping,
  messages,
  onClose,
  onInputChange,
  onSend,
}: ChatPanelProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className="absolute bottom-24 right-0 w-[340px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-black/5 dark:border-white/10 overflow-hidden flex flex-col"
  >
    <ChatHeader onClose={onClose} />

    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}

      <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
      <div ref={endRef} className="h-1" />
    </div>

    <ChatInput value={inputValue} onChange={onInputChange} onSubmit={onSend} />
  </motion.div>
);
