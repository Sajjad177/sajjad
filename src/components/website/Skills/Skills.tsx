"use client";
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import React, { useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", img: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
      { name: "Next.js", img: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
      { name: "TypeScript", img: "https://cdn.worldvectorlogo.com/logos/typescript.svg" },
      { name: "Tailwind CSS", img: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" },
      { name: "Framer Motion", img: "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" },
      { name: "Redux Toolkit", img: "https://cdn.worldvectorlogo.com/logos/redux.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", img: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "Express.js", img: "https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/20/express-js.png" },
      { name: "MongoDB", img: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" },
      { name: "PostgreSQL", img: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
      { name: "REST APIs", img: "https://cdn-icons-png.flaticon.com/512/603/603201.png" },
      { name: "Authentication", img: "https://cdn-icons-png.flaticon.com/512/2091/2091584.png" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Figma", img: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" },
      { name: "Git/GitHub", img: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" },
      { name: "Render", img: "https://cdn.worldvectorlogo.com/logos/render-1.svg" },
      { name: "Vercel", img: "https://cdn.worldvectorlogo.com/logos/vercel.svg" },
      { name: "Postman", img: "https://cdn.worldvectorlogo.com/logos/postman.svg" },
    ],
  },
];

const Skills = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 120 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Added: Subtle rotation based on mouse velocity/position
  const rotate = useTransform(mouseX, [0, 2000], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative bg-background py-20 md:py-32 px-4 sm:px-6 transition-colors duration-300 overflow-hidden"
    >
      {/* Floating Image Preview */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            style={{ 
              x, 
              y, 
              rotate,
              translateX: "-50%", 
              translateY: "-50%" 
            }}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            // ADJUSTED: Changed dimensions and added background styling
            className="fixed top-0 left-0 pointer-events-none z-50 
                       w-24 h-24 md:w-32 md:h-32 
                       overflow-hidden rounded-xl 
                       bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md 
                       border border-white/20 dark:border-zinc-700/50 
                       shadow-[0_10px_30px_rgba(0,0,0,0.2)] 
                       flex items-center justify-center p-4"
          >
            <motion.img 
              key={hoveredImage} // Forces animation when source changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              src={hoveredImage} 
              alt="Skill Preview" 
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 mb-3">Expertise</h2>
            <p className="text-[clamp(28px,5vw,48px)] font-medium text-black dark:text-white tracking-tight leading-tight">
              A specialized stack for <br />
              <span className="text-primary italic">modern performance.</span>
            </p>
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium">MERN Stack Developer</div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 p-8 md:p-10 transition-all duration-500 hover:bg-primary bg-primary"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-white/70 mb-8 transition-colors">
                {category.title}
              </h3>

              <ul className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    onMouseEnter={() => setHoveredImage(skill.img)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="flex items-center group/item relative z-10 cursor-none"
                  >
                    <span className="w-0 h-[1px] bg-white mr-0 group-hover/item:w-5 group-hover/item:mr-3 transition-all duration-300"></span>
                    <span className="text-base sm:text-lg md:text-xl font-medium  dark:text-zinc-300 text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p className="mt-16 text-center text-zinc-500 dark:text-zinc-400 font-medium text-sm md:text-base">
          Always learning. Always refining.
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;