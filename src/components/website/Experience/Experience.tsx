"use client";
import { motion } from "framer-motion";

const experienceData = [
  {
    id: "01",
    role: "Full-Stack Developer",
    company: "Vendo Food Distribution",
    period: "Dec 2023 — Present",
    location: "Dhaka, Bangladesh",
    description:
      "Leading the development of a B2B marketplace handling high-volume food logistics and real-time inventory.",
  },
  {
    id: "02",
    role: "UI/UX Designer",
    company: "Michael's Rental Project",
    period: "Feb 2024 — April 2024",
    location: "Remote",
    description:
      "Designed a premium showroom interface for niche equipment rentals, focusing on high-end SaaS aesthetics.",
  },
];

const Experience = () => {
  return (
    <section className="bg-[#f7efe2] dark:bg-[#1a1a1a] py-18 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-40 space-y-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-xs font-bold uppercase tracking-[0.5em] text-[#235347] dark:text-[#4a8b7a]"
          >
            My Professional Journey
          </motion.span>
          <h2 className="text-7xl md:text-9xl font-medium tracking-tighter text-black dark:text-white leading-none">
            Experience<span className="italic text-[#235347] dark:text-[#4a8b7a]">.</span>
          </h2>
        </header>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative pl-6 pb-16 border-l border-neutral-300 dark:border-neutral-700
              ${index === 1 ? "md:mt-24" : ""}
              ${index === 2 ? "md:mt-48" : ""}`}
            >
              {/* Timeline Dot */}
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#235347] dark:bg-[#4a8b7a]" />

              {/* Number */}
              <span className="text-3xl font-serif italic text-[#235347] dark:text-[#4a8b7a] block mb-6">
                {exp.id}
              </span>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 mt-1">
                    {exp.company}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {exp.period}
                  </p>
                  <p className="text-xs italic text-neutral-400 dark:text-neutral-500">
                    {exp.location}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-[260px]">
                  {exp.description}
                </p>
              </div>

              {/* Subtle Hover Line Expand */}
              <motion.div
                initial={{ height: "0%" }}
                whileHover={{ height: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute left-0 top-0 w-[1px] bg-[#235347] dark:bg-[#4a8b7a] opacity-20"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;