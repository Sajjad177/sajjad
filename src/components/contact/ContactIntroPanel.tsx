"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, User } from "lucide-react";

export const ContactIntroPanel = () => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="lg:col-span-6 flex flex-col"
  >
    <header className="mb-12">
      <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-4 block">
        Initialize Project
      </span>
      <h2 className="text-5xl md:text-7xl font-medium text-black dark:text-white leading-[0.95] tracking-tighter mb-8">
        {`Let's craft`} <br />
        <span className="italic font-light text-primary">Something great</span>.
      </h2>
      <p className="max-w-md text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
        Focusing on modern MERN solutions and intuitive user experiences. Drop a line to discuss
        collaboration or consulting.
      </p>
    </header>

    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex-1 w-full bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-[2rem] p-10 relative overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Available for work
          </span>
        </div>
        <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-2">
          Let&rsquo;s connect
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-sm leading-relaxed">
          Open to contract work, full-time roles, and collaborations. Pick a channel below and
          I&rsquo;ll reply within one business day.
        </p>
        <div className="grid grid-cols-1 gap-3">
          <a href="mailto:sajjadhossainx06@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md transition-all duration-300">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-black dark:text-white">Email</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                sajjadhossainx06@gmail.com
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
          </a>
          <a href="https://www.linkedin.com/in/sajjadsajjad" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md transition-all duration-300">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-black dark:text-white">LinkedIn</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                linkedin.com/in/sajjadsajjad
              </div>
            </div>
          </a>
        </div>
      </div>
      <div className="relative z-10 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <span className="text-xs text-zinc-500 dark:text-zinc-500">Usual response time</span>
        <span className="text-xs font-semibold text-black dark:text-white">~24 hours</span>
      </div>
    </motion.div>
  </motion.div>
);
