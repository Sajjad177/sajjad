"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to my portfolio! ✨", isBot: true },
    { id: 2, text: "I'm currently available for freelance projects. Feel free to ask me anything.", isBot: true },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now() + 1, 
          text: "Thanks for the message! I receive these instantly, but please use the contact form above for complex requests.", 
          isBot: true 
        }
      ]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.8, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-24 right-0 w-[340px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-black/5 dark:border-white/10 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#235347] to-[#4a8b7a] flex items-center justify-center p-0.5">
                    <img 
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" 
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
                  <h3 className="font-semibold text-lg text-black dark:text-white leading-tight">Sajjad Hossain</h3>
                  <p className="text-xs text-black/50 dark:text-white/50 font-medium tracking-wide uppercase">Front-End Developer</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: msg.isBot ? "bottom left" : "bottom right" }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  key={msg.id} 
                  className={`max-w-[85%] p-4 text-[15px] leading-relaxed shadow-sm ${
                    msg.isBot 
                      ? "bg-white dark:bg-[#1a1a1a] text-black dark:text-white self-start rounded-[1.5rem] rounded-tl-sm border border-zinc-100 dark:border-zinc-800"
                      : "bg-gradient-to-tr from-[#235347] to-[#4a8b7a] text-white self-end rounded-[1.5rem] rounded-tr-sm shadow-[0_5px_15px_rgba(35,83,71,0.2)]"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9, transformOrigin: 'bottom left' }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-[#1a1a1a] border border-zinc-100 dark:border-zinc-800 self-start rounded-[1.5rem] rounded-tl-sm px-5 py-4 flex items-center gap-1.5 shadow-sm"
                  >
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
                <form onSubmit={handleSend} className="bg-white dark:bg-[#111] p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center shadow-sm relative z-20 focus-within:ring-2 focus-within:ring-[#235347]/30 transition-all">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Send a message..."
                    className="flex-1 bg-transparent text-sm px-4 py-2 text-black dark:text-white placeholder-zinc-400 focus:outline-none"
                    suppressHydrationWarning
                />
                <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-full bg-[#235347] flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:scale-95 transition-all shadow-md group"
                >
                    <Send className="w-4 h-4 ml-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
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
        
        {/* Unread badge */}
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
    </div>
  );
}
