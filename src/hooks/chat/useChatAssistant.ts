"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage } from "@/types";
import { buildChatResponses, extractProjectTechs } from "@/utils";
import { useProjects } from "../projects";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 2,
    text: "Hello! I'm Sajjad Hossain's virtual assistant. How can I help you today?",
    isBot: true,
  },
];

export const useChatAssistant = (isOpen: boolean) => {
  const projects = useProjects();
  const endRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);

  const { techSet, techToProjects } = useMemo(
    () => extractProjectTechs(projects),
    [projects]
  );

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const pushBotMessage = (text: string) => {
    setMessages((current) => [...current, { id: Date.now(), text, isBot: true }]);
  };

  const handleSend = (event?: FormEvent) => {
    event?.preventDefault();
    const text = inputValue.trim();

    if (!text) return;

    setMessages((current) => [...current, { id: Date.now(), text, isBot: false }]);
    setInputValue("");
    setIsTyping(true);

    window.setTimeout(() => {
      const responses = buildChatResponses(text, {
        projects,
        techSet,
        techToProjects,
      });

      setIsTyping(false);
      responses.forEach(pushBotMessage);
    }, 900);
  };

  return {
    endRef,
    inputValue,
    isTyping,
    messages,
    setInputValue,
    handleSend,
  };
};
