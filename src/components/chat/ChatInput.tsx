"use client";

import type { FormEvent } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event?: FormEvent) => void;
};

export const ChatInput = ({ value, onChange, onSubmit }: ChatInputProps) => (
  <div className="p-4 bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-[#111] p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center shadow-sm relative z-20 focus-within:ring-2 focus-within:ring-[#235347]/30 transition-all"
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        placeholder="Send a message..."
        className="flex-1 bg-transparent text-sm px-4 py-2 text-black dark:text-white placeholder-zinc-400 focus:outline-none"
        suppressHydrationWarning
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="w-10 h-10 rounded-full bg-[#235347] flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:scale-95 transition-all shadow-md group"
      >
        <Send className="w-4 h-4 ml-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  </div>
);
