"use client";
import { motion } from "framer-motion";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" className="bg-background py-20 md:py-32 px-4 sm:px-6 transition-colors duration-300">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left Label */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <span className="w-6 sm:w-8 h-px bg-primary"></span>
            About Me
          </p>
        </motion.div>

        {/* Right Content */}
        <div className="md:col-span-9">
          <motion.h2
            variants={itemVariants}
            className="text-[clamp(28px,5vw,56px)] font-medium text-black dark:text-white leading-tight tracking-tight mb-8 md:mb-12"
          >
            I build <span className="text-primary italic">scalable</span> and <span className="text-primary italic">efficient</span> web applications that solve real-world problems.
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {/* Vision */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-black dark:text-white">
                The Vision
              </h3>
              <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I am a full stack developer specializing in MERN stack, with experience building scalable applications such as eCommerce platforms, booking systems, and learning management systems. I focus on performance, clean architecture, and real-world usability.
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-black dark:text-white">
                The Approach
              </h3>
              <p className="text-sm md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                My approach is simple understand the problem deeply, design efficient solutions, and build reliable systems. I prioritize backend performance, API design, and seamless user experience across all devices.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;