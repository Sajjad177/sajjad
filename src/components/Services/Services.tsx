"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Layout, Server, ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Web Development",
    icon: <Layout className="w-8 h-8" />,
    description: "Developing blazing fast, responsive, and highly interactive web applications tailored to your business needs.",
    tag: "Interface",
  },
  {
    id: "02",
    title: "Full-Stack Solutions",
    icon: <Server className="w-8 h-8" />,
    description: "Building complete end-to-end platforms, connecting beautiful interfaces with robust and secure backend systems.",
    tag: "Infrastructure",
  },
  {
    id: "03",
    title: "UI/UX & Product Design",
    icon: <Globe className="w-8 h-8" />,
    description: "Crafting intuitive user interfaces and experiences focused on user retention, accessibility, and high conversion.",
    tag: "Design",
  },
  {
    id: "04",
    title: "Cloud & Deployment",
    icon: <Cpu className="w-8 h-8" />,
    description: "Setting up reliable hosting, automated deployment pipelines, and ensuring zero-downtime server operations.",
    tag: "DevOps",
  },
];

const Services = () => {
  return (
    <section className="bg-[#f7efe2] dark:bg-[#1a1a1a] py-24 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header matching Experience section */}
        <header className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 dark:border-neutral-800 pb-8 gap-6">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-[#235347] dark:text-[#4a8b7a] mb-4 block"
            >
              What I Do
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-medium tracking-tight text-black dark:text-white"
            >
              Services<span className="italic text-[#235347] dark:text-[#4a8b7a]">.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-neutral-500 max-w-sm md:text-right"
          >
            Delivering end-to-end robust solutions. From fluid interfaces to scalable backends.
          </motion.p>
        </header>

        {/* Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white/40 dark:bg-white/5 border border-neutral-200 dark:border-neutral-800/50 rounded-[2rem] p-10 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:bg-white dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#235347]/5 dark:from-[#4a8b7a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                
                {/* Top: Icon & Number */}
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-2xl bg-[#235347]/10 dark:bg-[#4a8b7a]/20 text-[#235347] dark:text-[#4a8b7a] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <span className="text-4xl font-serif italic text-neutral-300 dark:text-neutral-700 group-hover:text-[#235347] dark:group-hover:text-[#4a8b7a] transition-colors duration-500">
                    {service.id}
                  </span>
                </div>

                {/* Bottom: Text & Details */}
                <div className="space-y-6">
                  <div>
                    <div className="inline-block px-3 py-1 mb-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {service.tag}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium text-black dark:text-white mb-3 group-hover:text-[#235347] dark:group-hover:text-[#4a8b7a] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

              </div>
              
              {/* Animated Arrow */}
              <div className="absolute top-10 right-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                <ArrowRight className="w-6 h-6 text-[#235347] dark:text-[#4a8b7a]" />
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="mt-20 text-center">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFB02E] hover:bg-orange-400 text-black rounded-full font-medium transition-colors shadow-lg shadow-orange-500/20"
          >
            Let's build something together
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Services;