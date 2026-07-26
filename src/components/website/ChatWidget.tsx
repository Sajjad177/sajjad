"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChatPanel, ChatToggleButton } from "@/components/chat";
import { useChatAssistant } from "@/hooks";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useChatAssistant(isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            endRef={chat.endRef}
            inputValue={chat.inputValue}
            isTyping={chat.isTyping}
            messages={chat.messages}
            onClose={() => setIsOpen(false)}
            onInputChange={chat.setInputValue}
            onSend={chat.handleSend}
          />
        )}
      </AnimatePresence>

      <ChatToggleButton isOpen={isOpen} onToggle={() => setIsOpen((state) => !state)} />
    </div>
  );
}
