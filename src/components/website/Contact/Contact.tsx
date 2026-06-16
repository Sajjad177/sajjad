/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Mail, MessageSquareText, Sparkles, User, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const FloatInput = ({ id, label, icon: Icon, type = 'text', value, onChange }: any) => (
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
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [buttonX, setButtonX] = useState(0);
  const [buttonY, setButtonY] = useState(0);

  const handleMouseMove = (e: any) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setButtonX((clientX - centerX) * 0.2);
    setButtonY((clientY - centerY) * 0.2);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        toast.error('Failed to send message. Please try again.');
      }

      setIsSending(false);
      setIsSent(true);
      setShowModal(true);
      setForm({ firstName: '', lastName: '', email: '', message: '' });

      setTimeout(() => setIsSent(false), 3000);
    } catch (error) {
      setIsSending(false);
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="bg-background py-32 px-6 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-stretch">
        {/* Left Side: Editorial Content & Professional Panel */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 flex flex-col"
        >
          <header className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary mb-4 block">
              Initialize Project
            </span>
            <h2 className="text-5xl md:text-7xl font-medium text-black dark:text-white leading-[0.95] tracking-tighter mb-8">
              {`Let's craft`} <br />
              <span className="italic font-light text-primary">Something great</span>.
            </h2>
            <p className="max-w-md text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              Focusing on modern MERN solutions and intuitive user experiences. Drop a line to
              discuss collaboration or consulting.
            </p>
          </header>

          {/* Professional Contact Panel */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex-1 w-full bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-[2rem] p-10 relative overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
          >
            {/* Subtle ambient glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/[0.07] rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Available for work
                </span>
              </div>

              <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-2">
                Let&rsquo;s connect
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-sm leading-relaxed">
                Open to contract work, full-time roles, and collaborations. Pick a channel below and
                I&rsquo;ll reply within one business day.
              </p>

              <div className="grid grid-cols-1 gap-3">
                <a
                  href="mailto:sajjadhossainx06@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black dark:text-white">Email</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      sajjadhossainx06@gmail.com
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </a>

                <a
                  href="https://www.linkedin.com/in/sajjadsajjad"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black dark:text-white">LinkedIn</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      linkedin.com/in/sajjadsajjad
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500 dark:text-zinc-500">Usual response time</span>
              <span className="text-xs font-semibold text-black dark:text-white">~24 hours</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: The Form */}
        <div className="lg:col-span-6 relative z-10 flex">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full p-12 md:p-16 rounded-[3rem] bg-primary shadow-2xl relative overflow-hidden flex flex-col"
          >
            {/* Decoration Background elements for form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-4">
                <FloatInput
                  id="firstName"
                  label="First Name"
                  icon={User}
                  value={form.firstName}
                  onChange={(e: any) => setForm({ ...form, firstName: e.target.value })}
                />
                <FloatInput
                  id="lastName"
                  label="Last Name"
                  icon={User}
                  value={form.lastName}
                  onChange={(e: any) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>

              <FloatInput
                id="email"
                label="Email"
                type="email"
                icon={Mail}
                value={form.email}
                onChange={(e: any) => setForm({ ...form, email: e.target.value })}
              />

              {/* Textarea Component */}
              <div className="relative z-0 w-full mb-10 group flex-1">
                <MessageSquareText className="absolute top-3 left-0 w-5 h-5 text-white/50 transition-colors group-focus-within:text-white" />
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="block py-3 px-0 pl-10 w-full text-lg text-white bg-transparent border-0 border-b border-white/30 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-all duration-300 resize-none"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="message"
                  className="absolute text-lg text-white/60 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:pl-10 peer-focus:pl-0 peer-focus:font-medium peer-focus:text-white peer-focus:-translate-y-7 peer-focus:scale-75"
                >
                  Message
                </label>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
              </div>

              {/* Magnetic Send Button */}
              <motion.div
                className="flex justify-end"
                animate={{ x: buttonX, y: buttonY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => {
                  setButtonX(0);
                  setButtonY(0);
                }}
              >
                <button
                  type="submit"
                  disabled={isSending || isSent}
                  className="relative inline-flex items-center gap-6 py-6 px-12 bg-secondary hover:bg-orange-400 text-black font-medium rounded-full overflow-hidden transition-all duration-300 group active:scale-95 disabled:opacity-70 shadow-xl"
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
                        <span className="font-bold uppercase tracking-widest text-xs flex items-center">
                          Send Message
                        </span>
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

      {/* Professional Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-orange-400 to-amber-500" />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
                title="Close Modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center mt-4">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1, duration: 0.6 }}
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-zinc-400 mb-8 font-light">
                  {`Thank you for reaching out. I've received your message and will get back to you as
                  soon as possible.`}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModal(false)}
                  className="w-full py-4 bg-primary text-black font-semibold rounded-full hover:bg-orange-400 transition-colors"
                >
                  Close & Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
