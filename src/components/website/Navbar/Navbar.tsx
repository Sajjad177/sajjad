'use client';

import { navLinks } from '@/config/data';
import { useEnvironment, useResolvedThemeMode } from '@/hooks';
import { calculateThemeAtmosphere } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Star, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { atmosphere, weather } = useEnvironment();
  const themeMode = useResolvedThemeMode();
  const activeTheme = mounted ? resolvedTheme : 'light';
  const themeVisuals = useMemo(
    () => calculateThemeAtmosphere(atmosphere.phase, weather, themeMode),
    [atmosphere.phase, weather, themeMode]
  );
  const navbarTint = useMemo(() => {
    const tints = {
      morning: {
        rest: 'rgba(255, 238, 204, 0.28)',
        solid: 'rgba(255, 244, 223, 0.76)',
        border: 'rgba(255, 255, 255, 0.38)',
        shadow: '0 18px 50px rgba(118, 87, 42, 0.08)',
      },
      afternoon: {
        rest: 'rgba(226, 242, 247, 0.28)',
        solid: 'rgba(245, 250, 249, 0.76)',
        border: 'rgba(255, 255, 255, 0.4)',
        shadow: '0 18px 50px rgba(60, 90, 104, 0.08)',
      },
      evening: {
        rest: 'rgba(255, 190, 139, 0.24)',
        solid: 'rgba(255, 232, 211, 0.76)',
        border: 'rgba(255, 232, 205, 0.34)',
        shadow: '0 18px 50px rgba(111, 63, 39, 0.1)',
      },
      night: {
        rest: 'rgba(24, 32, 54, 0.24)',
        solid: 'rgba(18, 18, 18, 0.92)',
        border: 'rgba(224, 235, 255, 0.14)',
        shadow: '0 18px 54px rgba(0, 0, 0, 0.18)',
      },
    };

    return tints[atmosphere.phase];
  }, [atmosphere.phase]);

  const toggleTheme = () => {
    const isDark = activeTheme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroExitPoint = Math.max(window.innerHeight - 96, 240);
      setScrolled(window.scrollY > heroExitPoint);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div className="relative mt-2 mx-4 w-full max-w-6xl">
        <motion.div
          className="w-full rounded-full border text-foreground shadow-sm backdrop-blur-2xl transition-colors duration-300"
          initial={false}
          animate={{
            backgroundColor: scrolled ? 'rgba(18, 18, 18, 0.92)' : navbarTint.rest,
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : navbarTint.border,
            boxShadow: scrolled ? '0 18px 54px rgba(0, 0, 0, 0.22)' : '0 10px 34px rgba(0, 0, 0, 0.04)',
          }}
          style={{
            backgroundImage: scrolled
              ? 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
              : `${themeVisuals.glow}, linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))`,
            backgroundBlendMode: 'soft-light, normal',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className={`${scrolled ? 'text-white' : 'text-zinc-950 dark:text-white'} font-title text-xl font-semibold tracking-tight flex items-center gap-2 drop-shadow-[0_1px_18px_rgba(255,255,255,0.24)] transition-colors duration-300`}
            >
              <Star className="fill-orange-500 text-orange-500" size={24} />
              Sajjad Hossain
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${scrolled ? 'text-neutral-200 hover:text-white' : 'text-zinc-800 hover:text-black dark:text-neutral-200 dark:hover:text-white'} relative text-md transition-colors duration-300`}
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/#contact"
                className="bg-secondary text-black px-5 py-2 rounded-full font-medium hover:bg-orange-400 transition-colors"
              >
                Get in touch!
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={toggleTheme}
                whileHover={{ scale: 1.08 }}
                className={`${scrolled ? 'text-white' : 'text-zinc-900 dark:text-white'} w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-colors hover:bg-white/25 disabled:opacity-50 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15`}
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {activeTheme === 'dark' ? (
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

              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((value) => !value)}
                className={`${scrolled ? 'text-white' : 'text-zinc-900 dark:text-white'} inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30 dark:border-white/10 dark:bg-white/10 md:hidden`}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden absolute top-full left-0 w-full"
            >
              <div
                className="mx-4 mt-2 rounded-2xl border border-white/25 shadow-lg backdrop-blur-2xl overflow-hidden dark:border-white/10"
                style={{
                  backgroundColor: scrolled ? 'rgba(18, 18, 18, 0.94)' : navbarTint.rest,
                  backgroundImage: scrolled
                    ? 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
                    : themeVisuals.glow,
                }}
              >
                <div className="flex flex-col px-6 py-4 gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`${scrolled ? 'text-neutral-100 hover:text-white' : 'text-neutral-800 hover:text-black dark:text-neutral-100 dark:hover:text-white'} transition`}
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
