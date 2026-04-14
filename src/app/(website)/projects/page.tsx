"use client";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const allProjects = [
  {
    id: "1",
    title: "Vendo Food Distribution",
    category: "B2B Ecommerce",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    description:
      "A specialized B2B ecosystem managing high-volume food distribution. Built to solve the friction between supplier inventory and real-time merchant procurement.",
  },
  {
    id: "2",
    title: "Uniform Portal & Swag Store",
    category: "E-commerce APIs",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    description:
      "An internal uniform and company swag store utilizing the complete power of Shopify's Storefront API. Included customized role-based access for specific employee spending limits and custom portal UI.",
  },
  {
    id: "3",
    title: "Social Media Feed Engine",
    category: "Full-stack Platform",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    description:
      "A highly scalable social feed engine built with Next.js 14. Integrated live real-time notifications, infinite scroll, and a complex relational database schema for users, posts, and comments.",
  },
  {
    id: "4",
    title: "Global Supply Chain Dashboard",
    category: "Data Visualization",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    description:
      "Real-time analytics dashboard monitoring international supply chain logistics. Engineered with millions of data points mapping transit delays and predictive ETAs.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const ProjectsPage = () => {
  return (
    <main className="bg-[#f7efe2] dark:bg-[#1a1a1a] min-h-screen transition-colors duration-500 selection:bg-[#235347] selection:text-white pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24">
        
        {/* Navigation */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-20"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Back to Home
          </span>
        </Link>

        {/* Header Section */}
        <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#235347] dark:text-[#4a8b7a] block mb-6">
              Our Archive
            </span>
            <h1 className="text-[clamp(40px,8vw,120px)] font-medium tracking-tighter leading-[0.9] text-black dark:text-white">
              Selected <br />
              <span className="italic text-[#235347] dark:text-[#4a8b7a]">
                Works.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light"
          >
            A cohesive collection of products built for scalability, robustness, and unparalleled user experiences.
          </motion.p>
        </header>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-32"
        >
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group cursor-pointer flex flex-col group relative"
            >
              {/* Image Container */}
              <Link href={`/project/${project.id}`} className="relative block overflow-hidden rounded-[2rem] aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 mb-8 border border-zinc-200 dark:border-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#235347] text-white rounded-full flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </Link>
              
              {/* Project Meta */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border border-zinc-300 dark:border-zinc-700 rounded-full text-black dark:text-zinc-400">
                      {project.year}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#235347] dark:text-[#4a8b7a]">
                      {project.category}
                    </span>
                  </div>
                  
                  <Link href={`/project/${project.id}`}>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black dark:text-white mb-4 group-hover:italic transition-all">
                      {project.title}
                    </h2>
                  </Link>

                  <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-2 max-w-md">
                    {project.description}
                  </p>
                </div>
                
                {/* Decorative Index */}
                <span className="text-zinc-300 dark:text-zinc-800 text-6xl font-medium tracking-tighter">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default ProjectsPage;
