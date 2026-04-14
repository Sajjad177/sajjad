"use client";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "Authentication"],
  },
  {
    title: "Tools",
    skills: ["Figma", "Git/GitHub", "Render", "Vercel", "Postman"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const Skills = () => {
  return (
    <section className="bg-[#f7efe2] dark:bg-[#1a1a1a] py-20 md:py-32 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-zinc-400 mb-3">
              Expertise
            </h2>

            <p className="text-[clamp(28px,5vw,48px)] font-medium text-black dark:text-white tracking-tight leading-tight">
              A specialized stack for <br />
              <span className="text-[#235347] italic">modern performance.</span>
            </p>
          </div>

          <div className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg font-medium">
            MERN Stack Developer
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 cursor-pointer bg-[#235347] dark:bg-zinc-900 p-8 md:p-10 transition-all duration-300 hover:shadow-xl hover:border-transparent"
            >
              {/* Gradient Hover Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#235347]/10 to-transparent pointer-events-none" />

              {/* Title */}
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
                {category.title}
              </h3>

              {/* Skills */}
              <ul className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <motion.li
                    key={sIdx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: sIdx * 0.05 }}
                    className="flex items-center group/item"
                  >
                    {/* Animated Line */}
                    <span className="w-0 h-[1px] bg-black dark:bg-white mr-0 group-hover/item:w-5  group-hover/item:mr-3 transition-all duration-300"></span>

                    {/* Skill Text */}
                    <span className="text-base sm:text-lg md:text-xl font-medium text-white cursor-pointer dark:text-zinc-300 dark:group-hover/item:text-white transition">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center text-zinc-500 dark:text-zinc-400 font-medium text-sm md:text-base"
        >
          Always learning. Always refining.
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;