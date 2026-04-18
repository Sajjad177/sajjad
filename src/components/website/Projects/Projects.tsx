"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const projectData = [
  {
    id: 1,
    title: "Vendo Food Distribution",
    category: "B2B Ecommerce • Full Stack (Next.js + Node.js)",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    link: "/project/1",
  },
  {
    id: 2,
    title: "Job Seeker Platform",
    category: "Job Platform • Full Stack (Next.js + Node.js)",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    link: "/project/2",
  },
  {
    id: 3,
    title: "Online Appointment Booking System",
    category: "Booking Platform • Full Stack (Next.js + Node.js)",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    link: "/project/3",
  },
];

const Projects = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="bg-[#f7efe2] dark:bg-[#1a1a1a] py-20 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between pb-10 md:pb-12 gap-6">
          <div className="space-y-4">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-400">
              03 — Case Studies
            </span>

            <h2 className="text-[clamp(40px,8vw,120px)] font-medium tracking-tighter text-black dark:text-white leading-none">
              Featured <br />
              <span className="text-[#235347] dark:text-[#4a8b7a] italic">
                Work.
              </span>
            </h2>
          </div>

          <p className="max-w-[300px] text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-snug font-light">
            Focusing on scalable architectures and high-end digital aesthetics.
          </p>
        </header>

        {/* Project List */}
        <div className="relative z-10">
          {projectData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setActiveImage(project.image)}
              onMouseLeave={() => setActiveImage(null)}
              className="group"
            >
              <Link
                href={project.link}
                className="flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-500"
              >
                {/* Left */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    [{index + 1}]
                  </span>

                  <h3 className="text-[clamp(24px,5vw,64px)] font-medium text-black dark:text-white transition-all duration-500 ease-out group-hover:italic group-hover:translate-x-4">
                    {project.title}
                  </h3>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6 md:gap-12 mt-6 md:mt-0">
                  <p className="text-zinc-400 dark:text-zinc-500 font-medium md:text-lg uppercase tracking-widest text-xs md:text-sm">
                    {project.category}
                  </p>

                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border border-zinc-300 dark:border-zinc-700 group-hover:scale-110 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5px]" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Floating Image */}
        <motion.div
          style={{
            left: smoothX,
            top: smoothY,
            x: "-50%",
            y: "-50%",
          }}
          className="fixed pointer-events-none z-0 w-[280px] sm:w-[350px] md:w-[450px] h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden rounded-xl opacity-0 transition-opacity duration-500 ease-in-out hidden md:block"
          animate={{
            opacity: activeImage ? 1 : 0,
            scale: activeImage ? 1 : 0.9,
            rotate: activeImage ? 2 : 0,
          }}
        >
          {activeImage && (
            <img
              src={activeImage}
              alt="Project preview"
              className="w-full h-full object-cover grayscale brightness-90 transition-all duration-700"
            />
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-20 md:mt-32 pt-10 md:pt-12 flex justify-end">
          <Link
            href="/projects"
            className="group flex items-center gap-4 text-black dark:text-white text-xs md:text-sm font-bold uppercase tracking-widest"
          >
            Explore All Work
            <div className="w-10 h-[1px] bg-black dark:bg-white group-hover:w-20 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;