"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);

const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
    icon: <Linkedin className="w-4 h-4" />,
    color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
  },
  {
    name: "GitHub",
    href: "#",
    icon: <Github className="w-4 h-4" />,
    color: "hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white",
  },
  {
    name: "Instagram",
    href: "#",
    icon: <Instagram className="w-4 h-4" />,
    color: "hover:bg-[#E4405F]/10 hover:text-[#E4405F]",
  },
];

  return (
    <footer className="bg-[#f7efe2] dark:bg-[#1a1a1a] pt-24 pb-8 px-6 relative overflow-hidden transition-colors duration-700 border-t border-neutral-200 dark:border-neutral-800">
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Section: The Big Hook */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-12 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-[#235347] dark:bg-[#4a8b7a]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#235347] dark:text-[#4a8b7a]">
                Project Inquiry
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-medium tracking-tight text-black dark:text-white leading-[1.1] mb-8"
            >
              Ready to <span className="italic font-light text-[#235347]">elevate</span> your <br className="hidden md:block" />
              digital presence?
            </motion.h2>

            <motion.div
               whileHover={{ x: 10 }}
               className="inline-flex items-center gap-4 group cursor-pointer"
            >
                <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium border-b border-transparent group-hover:border-black dark:group-hover:border-white transition-all pb-0.5">
                    Start a conversation
                </span>
            </motion.div>
          </div>
        </div>



        {/* Bottom Bar: Clean Meta Data */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
          
          {/* Copyright Section */}
          <div className="flex flex-col items-center md:items-start gap-1 order-2 md:order-1">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                © {currentYear} Sajjad Hossain
             </span>
             <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                Designed with focus & precision.
             </span>
          </div>

          {/* Socials - Centered */}
          <div className="flex justify-center gap-6 order-1 md:order-2">
  {socialLinks.map((link) => (
    <motion.a
      key={link.name}
      href={link.href}
      whileHover={{ y: -3, scale: 1.08 }}
      transition={{ duration: 0.2 }}
      className={`w-10 h-10 rounded-full 
      bg-zinc-100 dark:bg-white/5 
      flex items-center justify-center 
      text-zinc-500 dark:text-zinc-400 
      transition-all duration-200 
      ${link.color} group relative`}
    >
      {link.icon}

      {/* Tooltip */}
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {link.name}
      </span>
    </motion.a>
  ))}
</div>

          {/* Status & Time - End */}
          <div className="flex flex-col items-center md:items-end gap-1 order-3">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-black dark:text-white">Systems Online</span>
             </div>
             <p suppressHydrationWarning className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} GMT+6
             </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;