"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      {/* Wrapper (IMPORTANT: relative added) */}
      <div className="relative mt-2 mx-4 w-full max-w-6xl">
        {/* Navbar */}
        <div
          className={`w-full rounded-full transition-all duration-300 text-white ${
            resolvedTheme === "dark" ? "bg-neutral-900" : "bg-[#235347]"
          } ${scrolled ? "backdrop-blur-md shadow-sm" : ""}`}
        >
          <div className="px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-title text-xl font-semibold tracking-tight"
            >
              Sajjad
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-md text-white dark:text-neutral-300 transition-colors duration-300"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="p-2 rounded-md cursor-pointer dark:hover:bg-neutral-800 transition"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {resolvedTheme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Button */}
              <button className="md:hidden" onClick={() => setOpen(!open)}>
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Fixed Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden absolute top-full left-0 w-full"
            >
              <div className="mx-4 mt-2 rounded-2xl bg-white dark:bg-neutral-900 shadow-lg overflow-hidden">
                <div className="flex flex-col px-6 py-4 gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
