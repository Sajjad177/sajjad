"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Box, CheckCircle2, Globe, Lightbulb } from "lucide-react";
import Link from "next/link";
import { use } from "react";

// Add specific backend/frontend split to your data map for a "Pro" look
const projectDataMap = {
  "1": {
    title: "Vendo Food Distribution",
    category: "B2B Ecommerce",
    year: "2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    description: "A specialized B2B ecosystem managing high-volume food distribution. Built to solve the friction between supplier inventory and real-time merchant procurement.",
    role: "Full-Stack Architect",
    client: "Vendo Food Logistics",
    stack: {
      frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "TanStack Query"],
      backend: ["Node.js", "MongoDB", "Redis", "BullMQ", "Express"]
    },
    liveLink: "#",
    challenge: "Synchronizing inventory across 14 regional warehouses with sub-second latency while handling 50k+ concurrent SKUs.",
    solution: "Implemented a Redis-backed caching layer and a message queue system (BullMQ) to decouple heavy distribution logic from the user-facing API.",
    impact: ["35% faster order cycles", "Zero overselling incidents", "Real-time stock transparency"]
  },

  "2": {
    title: "Vendo Food Distribution",
    category: "B2B Ecommerce",
    year: "2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    description: "A specialized B2B ecosystem managing high-volume food distribution. Built to solve the friction between supplier inventory and real-time merchant procurement.",
    role: "Full-Stack Architect",
    client: "Vendo Food Logistics",
    stack: {
      frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "TanStack Query"],
      backend: ["Node.js", "MongoDB", "Redis", "BullMQ", "Express"]
    },
    liveLink: "#",
    challenge: "Synchronizing inventory across 14 regional warehouses with sub-second latency while handling 50k+ concurrent SKUs.",
    solution: "Implemented a Redis-backed caching layer and a message queue system (BullMQ) to decouple heavy distribution logic from the user-facing API.",
    impact: ["35% faster order cycles", "Zero overselling incidents", "Real-time stock transparency"]
  },

  "3": {
    title: "Vendo Food Distribution",
    category: "B2B Ecommerce",
    year: "2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    description: "A specialized B2B ecosystem managing high-volume food distribution. Built to solve the friction between supplier inventory and real-time merchant procurement.",
    role: "Full-Stack Architect",
    client: "Vendo Food Logistics",
    stack: {
      frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "TanStack Query"],
      backend: ["Node.js", "MongoDB", "Redis", "BullMQ", "Express"]
    },
    liveLink: "#",
    challenge: "Synchronizing inventory across 14 regional warehouses with sub-second latency while handling 50k+ concurrent SKUs.",
    solution: "Implemented a Redis-backed caching layer and a message queue system (BullMQ) to decouple heavy distribution logic from the user-facing API.",
    impact: ["35% faster order cycles", "Zero overselling incidents", "Real-time stock transparency"]
  },
};

const SingleProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const project = projectDataMap[resolvedParams.id as keyof typeof projectDataMap];

  if (!project) return null;

  return (
    <main className="bg-[#f7efe2] dark:bg-[#0a0a0a] min-h-screen transition-colors duration-500 selection:bg-[#235347] selection:text-white pb-32">
      
      {/* Top Progress Bar (Visual Detail) */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#235347] dark:bg-[#4a8b7a] origin-left z-50"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        {/* Nav: Minimalist & Flat */}
        <Link href="/" className="group flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-20">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Gallery Archive</span>
        </Link>

        {/* Header: Dramatic Scale */}
        <header className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-zinc-300 dark:border-zinc-800 rounded-full dark:text-zinc-400">
              {project.year}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-[#235347] text-white rounded-full">
              {project.category}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="text-[clamp(40px,10vw,120px)] font-medium tracking-tighter leading-[0.9] text-black dark:text-white mb-10"
          >
            {project.title.split(' ')[0]} <br />
            <span className="italic text-[#235347] dark:text-[#4a8b7a]">{project.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <div className="flex flex-wrap gap-8 items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <div className="flex gap-12">
              
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Role</p>
                <p className="font-medium dark:text-white">{project.role}</p>
              </div>
            </div>
            <motion.a
  href={project.liveLink}
  target="_blank"
  rel="noopener noreferrer"
  initial="rest"
  whileHover="hover"
  animate="rest"
  className="group inline-flex items-center gap-2 text-sm font-semibold 
  text-[#235347] dark:text-[#4a8b7a] cursor-pointer"
>
  {/* Text */}
  <span className="relative">
    Live Preview
    
    {/* Animated underline */}
    <motion.span
      variants={{
        rest: { width: "0%" },
        hover: { width: "100%" },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute left-0 -bottom-0.5 h-[1.5px] bg-current"
    />
  </span>

  {/* Icon */}
  <motion.span
    variants={{
      rest: { x: 0, opacity: 0.7 },
      hover: { x: 4, opacity: 1 },
    }}
    transition={{ duration: 0.2 }}
    className="flex items-center"
  >
    <Globe className="w-4 h-4 animate-bounce" />
  </motion.span>
</motion.a>
          </div>
        </header>

        {/* Main Image: Razor Sharp, No Shadow */}
        <div className="w-full aspect-[21/9] bg-zinc-200 dark:bg-zinc-900 rounded-[2rem] overflow-hidden mb-32 border border-zinc-200 dark:border-zinc-800">
          <img src={project.image} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>

        {/* Content Section: The "Architecture" Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Narrative */}
          <div className="lg:col-span-7 space-y-32">
            
            <section>
              <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#235347] dark:text-[#4a8b7a] mb-8">
                <Box className="w-4 h-4" /> 01. Context
              </h3>
              <p className="text-2xl md:text-3xl text-zinc-800 dark:text-zinc-200 leading-tight tracking-tight">
                {project.description}
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-6">
                  <Lightbulb className="w-4 h-4" /> 02. The Challenge
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-green-600 mb-6">
                  <CheckCircle2 className="w-4 h-4" /> 03. The Solution
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">04. Deliverables & Impact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.impact.map((text, i) => (
                  <div key={i} className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <p className="text-black dark:text-white font-medium leading-tight">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Technical manifest */}
          <aside className="lg:col-span-5">
  <div className="sticky top-12 space-y-12">
    
    {/* Section Header */}
    <div className="flex items-center gap-4">
      <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
        Technical Specifications
      </h3>
    </div>

    {/* The Stack List - Minimalist approach */}
    <div className="space-y-12 pl-4 border-l border-zinc-200 dark:border-zinc-800">
      
      {/* Frontend Environment */}
      <div className="group">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#235347] dark:text-[#4a8b7a] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Frontend Environment
        </h4>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {project.stack.frontend.map((t) => (
            <span 
              key={t} 
              className="text-lg md:text-xl font-medium text-black dark:text-white hover:italic transition-all cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Backend Infrastructure */}
      <div className="group">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Backend Infrastructure
        </h4>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {project.stack.backend.map((t) => (
            <span 
              key={t} 
              className="text-lg md:text-xl font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Development & DevOps (Added for more professional depth) */}
      <div className="group">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          Deployment
        </h4>
        <p className="text-lg font-medium text-black dark:text-white">
          Vercel / AWS / Docker
        </p>
      </div>
    </div>
  </div>
</aside>
        </div>
      </div>
    </main>
  );
};

export default SingleProjectPage;