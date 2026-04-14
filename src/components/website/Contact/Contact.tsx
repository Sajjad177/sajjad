"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Mail, MessageSquareText, Sparkles } from "lucide-react";
import Lottie from "lottie-react";

const FloatInput = ({ id, label, icon: Icon, type = "text", value, onChange } : any) => (
  <div className="relative z-0 w-full mb-10 group">
    <Icon className="absolute top-3 left-0 w-5 h-5 text-white/50 transition-colors group-focus-within:text-white" />
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="block py-3 px-0 pl-10 w-full text-lg text-white bg-transparent border-0 border-b border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-all duration-300"
      placeholder=" "
      required
      suppressHydrationWarning={true}
    />
    <label
      htmlFor={id}
      className="absolute text-lg text-white/60 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:pl-10 peer-focus:pl-0 peer-focus:font-medium peer-focus:text-white peer-focus:-translate-y-7 peer-focus:scale-75"
    >
      {label}
    </label>
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
  </div>
);

const Contact = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [lottieData, setLottieData] = useState(null);

  // Magnetic Button Effect Variables
  const [buttonX, setButtonX] = useState(0);
  const [buttonY, setButtonY] = useState(0);

  useEffect(() => {
    fetch('/images/Man with contact us board.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(err => console.error("Could not load lottie animation:", err));
  }, []);

  const handleMouseMove = (e : any) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setButtonX((clientX - centerX) * 0.2);
    setButtonY((clientY - centerY) * 0.2);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setForm({ firstName: "", lastName: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 3000);
    }, 2000);
  }; 

  return (
    <section id="contact" className="bg-[#f7efe2] dark:bg-[#1a1a1a] py-32 px-6 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
        
        {/* Left Side: Editorial Content & Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 space-y-12"
        >
          <header>
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-[#235347] dark:text-[#4a8b7a] mb-4 block">
              Inititalize Project
            </span>
            <h2 className="text-5xl md:text-7xl font-medium text-black dark:text-white leading-[0.95] tracking-tighter mb-8">
              Let's craft <br />
              <span className="italic font-light text-[#235347] dark:text-[#4a8b7a]">Something great</span>.
            </h2>
            <p className="max-w-md text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              Focusing on modern MERN solutions and intuitive user experiences. Drop a line to discuss collaboration or consulting.
            </p>
          </header>

          {/* Sytlish Image Card (Editorial Look) */}
          <motion.div 
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="w-full aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] p-10 relative overflow-hidden group border border-zinc-200 dark:border-zinc-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop" 
              alt="Workspace" 
              className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end">
                <Sparkles className="w-8 h-8 text-white mb-6" />
                <h3 className="text-3xl font-bold text-white tracking-tight">Technical Excellence</h3>
                <p className="text-zinc-300">From concept to scalable deployment.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: The Form & Lottie */}
        <div className="lg:col-span-6 relative z-10">
          
          {/* Peeking Lottie Animation */}
          {lottieData && (
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 40, delay: 0.6 }}
              className="absolute -top-40 md:-top-56 right-8 md:right-16 w-56 md:w-72 h-56 md:h-72 -z-10"
            >
              <Lottie animationData={lottieData} loop={true} />
            </motion.div>
          )}

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="p-12 md:p-16 rounded-[3rem] bg-[#235347] shadow-2xl relative overflow-hidden"
          >
            {/* Decoration Background elements for form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-4">
                <FloatInput 
                  id="firstName" 
                  label="First Name" 
                  icon={User} 
                  value={form.firstName} 
                  onChange={(e : any) => setForm({...form, firstName: e.target.value})} 
                />
                <FloatInput 
                  id="lastName" 
                  label="Last Name" 
                  icon={User} 
                  value={form.lastName} 
                  onChange={(e : any) => setForm({...form, lastName: e.target.value})} 
                />
              </div>
              
              <FloatInput 
                id="email" 
                label="Professional Email" 
                type="email" 
                icon={Mail} 
                value={form.email} 
                onChange={(e : any) => setForm({...form, email: e.target.value})} 
              />
              
              {/* Textarea Component */}
              <div className="relative z-0 w-full mb-16 group">
                <MessageSquareText className="absolute top-3 left-0 w-5 h-5 text-white/50 transition-colors group-focus-within:text-white" />
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  rows={4}
                  className="block py-3 px-0 pl-10 w-full text-lg text-white bg-transparent border-0 border-b border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-all duration-300 resize-none"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="message"
                  className="absolute text-lg text-white/60 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:pl-10 peer-focus:pl-0 peer-focus:font-medium peer-focus:text-white peer-focus:-translate-y-7 peer-focus:scale-75"
                >
                  Project Description
                </label>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
              </div>

              {/* Magnetic Send Button */}
              <motion.div 
                className="flex justify-end mt-8"
                animate={{ x: buttonX, y: buttonY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { setButtonX(0); setButtonY(0); }}
              >
                <button 
                  type="submit" 
                  disabled={isSending || isSent}
                  className="relative inline-flex items-center gap-6 py-6 px-12 bg-white hover:bg-zinc-200 text-black font-medium rounded-full overflow-hidden transition-all duration-300 group active:scale-95 disabled:opacity-70 shadow-xl"
                >
                  <AnimatePresence mode="wait">
                    {isSent ? (
                        <motion.span 
                            key="sent"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                        >
                            Success <Sparkles className="w-4 h-4" />
                        </motion.span>
                    ) : isSending ? (
                        <motion.div 
                            key="sending"
                            className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"
                        />
                    ) : (
                        <motion.div 
                            key="idle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-6"
                        >
                            <span className="font-bold uppercase tracking-widest text-xs flex items-center">Send Message</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;