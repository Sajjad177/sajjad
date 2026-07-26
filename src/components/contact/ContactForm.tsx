"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail, MessageSquareText, Sparkles, User } from "lucide-react";
import type { FormEvent, MouseEvent } from "react";
import type { ContactFormState } from "@/types";
import { FloatingInput } from "./FloatingInput";

type ContactFormProps = {
  buttonOffset: { x: number; y: number };
  form: ContactFormState;
  isSending: boolean;
  isSent: boolean;
  onButtonMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
  onButtonMouseLeave: () => void;
  onFieldChange: (field: keyof ContactFormState, value: string) => void;
  onSubmit: (event: FormEvent) => void;
};

export const ContactForm = ({
  buttonOffset,
  form,
  isSending,
  isSent,
  onButtonMouseMove,
  onButtonMouseLeave,
  onFieldChange,
  onSubmit,
}: ContactFormProps) => (
  <div className="lg:col-span-6 relative z-10 flex">
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full p-12 md:p-16 rounded-[3rem] bg-primary shadow-2xl relative overflow-hidden flex flex-col"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-4">
          <FloatingInput
            id="firstName"
            label="First Name"
            icon={User}
            value={form.firstName}
            onChange={(value) => onFieldChange("firstName", value)}
          />
          <FloatingInput
            id="lastName"
            label="Last Name"
            icon={User}
            value={form.lastName}
            onChange={(value) => onFieldChange("lastName", value)}
          />
        </div>
        <FloatingInput
          id="email"
          label="Email"
          type="email"
          icon={Mail}
          value={form.email}
          onChange={(value) => onFieldChange("email", value)}
        />
        <div className="relative z-0 w-full mb-10 group flex-1">
          <MessageSquareText className="absolute top-3 left-0 w-5 h-5 text-white/50 transition-colors group-focus-within:text-white" />
          <textarea
            id="message"
            value={form.message}
            onChange={(event) => onFieldChange("message", event.target.value)}
            rows={4}
            className="block py-3 px-0 pl-10 w-full text-lg text-white bg-transparent border-0 border-b border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-all duration-300 resize-none"
            placeholder=" "
            required
          />
          <label
            htmlFor="message"
            className="absolute text-lg text-white/60 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:pl-10 peer-focus:pl-0 peer-focus:font-medium peer-focus:text-white peer-focus:-translate-y-7 peer-focus:scale-75"
          >
            Message
          </label>
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
        </div>
        <motion.div
          className="flex justify-end"
          animate={{ x: buttonOffset.x, y: buttonOffset.y }}
          onMouseMove={onButtonMouseMove}
          onMouseLeave={onButtonMouseLeave}
        >
          <button
            type="submit"
            disabled={isSending || isSent}
            className="relative inline-flex items-center gap-6 py-6 px-12 bg-secondary hover:bg-orange-400 text-black font-medium rounded-full overflow-hidden transition-all duration-300 group active:scale-95 disabled:opacity-70 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.span key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                  Success <Sparkles className="w-4 h-4" />
                </motion.span>
              ) : isSending ? (
                <motion.div key="sending" className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <motion.div key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-6">
                  <span className="font-bold uppercase tracking-widest text-xs flex items-center">
                    Send Message
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>
    </motion.form>
  </div>
);
