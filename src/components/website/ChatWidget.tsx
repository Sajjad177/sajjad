'use client';
import { personalInfo } from '@/config/data';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Project = {
  id: string;
  title: string;
  category: string;
  year?: string;
  description?: string;
  role?: string;
  stack?: Record<string, string[]>;
  challenge?: string;
  solution?: string;
  impact?: string[];
  liveLink?: string;
  image?: string[];
};

type ChatMsg = { id: number; text: string; isBot: boolean };

const normalize = (s: string) => s.toLowerCase();
const words = (s: string) => normalize(s).match(/\w+/g) || [];

const projectSearchText = (p: Project) => {
  const parts: string[] = [];
  if (p.title) parts.push(p.title);
  if (p.category) parts.push(p.category);
  if (p.description) parts.push(p.description);
  if (p.challenge) parts.push(p.challenge);
  if (p.solution) parts.push(p.solution);
  if (p.stack) {
    Object.values(p.stack).forEach((arr) => {
      parts.push(arr.join(' '));
    });
  }
  return normalize(parts.join(' '));
};

const scoreProject = (queryTokens: string[], pText: string, p: Project, techSet: Set<string>) => {
  let score = 0;
  for (const t of queryTokens) {
    if (pText.includes(t)) score += 2;
    if (techSet.has(t)) score += 3;
  }
  if (p.liveLink) score += 1;
  return score;
};

const extractTechs = (projects: Project[]) => {
  const techSet = new Set<string>();
  const techToProjects = new Map<string, Project[]>();
  projects.forEach((p) => {
    if (!p.stack) return;
    Object.values(p.stack).forEach((arr) => {
      arr.forEach((tech) => {
        const key = normalize(tech).replace(/[^a-z0-9]/g, '');
        techSet.add(key);
        const list = techToProjects.get(key) || [];
        list.push(p);
        techToProjects.set(key, list);
      });
    });
  });
  return { techSet, techToProjects };
};

const detectIntent = (text: string) => {
  const t = normalize(text);
  if (/^(hi|hello|hey|good)/.test(t)) return 'greeting';
  if (/about|who are you|introduce|tell me about|yourself/.test(t)) return 'about';
  if (/contact|email|phone|whatsapp|reach|get in touch/.test(t)) return 'contact';
  if (/project|projects|portfolio|work|showcase|case study/.test(t)) return 'projects';
  if (/skill|skills|stack|technolog|react|node|figma|tailwind/.test(t)) return 'skills';
  if (
    /idea|build|can you build|do you build|i want to build|i have an idea|i have a project|need a developer|looking for a developer/.test(
      t,
    )
  )
    return 'lead';
  if (
    /stripe|mongo|mongodb|socket.io|socketio|webrtc|node|react|next|typescript|express|jwt|cloudinary|stripe/.test(
      t,
    )
  )
    return 'tech_search';
  return 'fallback';
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 2,
      text: "Hello! I'm Sajjad Hossain's virtual assistant. How can I help you today?",
      isBot: true,
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [techSet, setTechSet] = useState<Set<string>>(new Set());
  const [techMap, setTechMap] = useState<Map<string, Project[]>>(new Map());

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((r) => r.json())
      .then((data) => {
        const arr: Project[] = Object.entries(data).map(([id, p]) => ({ id, ...(p as any) }));
        setProjects(arr);
        const { techSet: tset, techToProjects } = extractTechs(arr);
        setTechSet(tset);
        setTechMap(techToProjects);
      })
      .catch(() => {
        // ignore — fallback will handle
      });
  }, []);

  const pushBot = (text: string) => {
    setMessages((m) => [...m, { id: Date.now(), text, isBot: true }]);
  };

  const formatProject = (p: Project) => {
    const techs: string[] = [];
    if (p.stack) Object.values(p.stack).forEach((arr) => arr.forEach((t) => techs.push(t)));
    const impact = p.impact && p.impact.length ? p.impact.map((it) => `• ${it}`).join('\n') : '';
    return [
      `Project: ${p.title}`,
      `Category: ${p.category}`,
      p.description ? `Description:\n${p.description}` : '',
      techs.length ? `Technologies: ${techs.join(', ')}` : '',
      impact ? `Impact:\n${impact}` : '',
      p.liveLink ? `Live URL: ${p.liveLink}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');
  };

  const searchProjects = (query: string, limit = 5) => {
    const qTokens = words(query);
    const indexed = projects.map((p) => {
      const text = projectSearchText(p);
      const s = scoreProject(qTokens, text, p, techSet);
      return { p, score: s };
    });
    const results = indexed
      .filter((i) => i.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((i) => i.p);
    return results.slice(0, limit);
  };

  const searchByTech = (q: string) => {
    const key = normalize(q).replace(/[^a-z0-9]/g, '');
    const direct = techMap.get(key) || [];
    if (direct.length) return direct;
    const subs: Project[] = [];
    techMap.forEach((plist, tech) => {
      if (tech.includes(key) || key.includes(tech)) {
        plist.forEach((p) => subs.push(p));
      }
    });
    return Array.from(new Set(subs));
  };

  const professionalFallback = (query: string) => {
    return (
      "While there isn't currently a publicly showcased project that exactly matches that requirement, " +
      'Sajjad has extensive experience building scalable web applications using modern technologies such as React, Next.js, Node.js, Express, MongoDB, TypeScript, Stripe, Socket.IO, WebRTC, and cloud-based architectures. ' +
      'If you share a few details about your idea, Sajjad can propose an approach and timeline — or you can contact him at ' +
      `${personalInfo.email} (or use /#contact). Typical response time is within 24 hours.`
    );
  };

  const handleLead = () => {
    return (
      `Thank you for sharing your project idea. I'd be happy to learn more about your requirements. Please provide:\n\n` +
      `• Project goals\n• Core features\n• Target users\n• Timeline\n• Budget (optional)\n\n` +
      `After reviewing the details, Sajjad can recommend an implementation strategy and arrange a meeting. Email: ${personalInfo.email} \nTypical response time is within 24 hours.`
    );
  };

  const skillsSummary = () => {
    const techs = Array.from(techSet);
    if (!techs.length)
      return 'Key skills: MERN (React, Next.js), Node.js, MongoDB, Express, TypeScript, Tailwind CSS.';
    const cap = techs.map((t) =>
      t
        .split(/\s+/)
        .map((w) => w[0]?.toUpperCase() + w.slice(1))
        .join(' '),
    );
    return `Key skills: ${cap.join(', ')}.`;
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    setMessages((m) => [...m, { id: Date.now(), text, isBot: false }]);
    setInputValue('');
    setIsTyping(true);

    const intent = detectIntent(text);

    setTimeout(() => {
      setIsTyping(false);

      if (intent === 'greeting') {
        pushBot("Hello! I'm Sajjad Hossain's virtual assistant. How can I help you today?");
        return;
      }

      if (intent === 'about') {
        const about = `${personalInfo.name}\n${personalInfo.title}\n${personalInfo.aboutHeading}\n${personalInfo.aboutText}`;
        pushBot(about + `\n\nLocation: ${personalInfo.location}`);
        return;
      }

      if (intent === 'contact') {
        const contactMsg = `I'd be glad to help you get in touch with Sajjad Hossain. You can reach him directly via:\n\nEmail: ${personalInfo.email}\nPhone / WhatsApp: ${personalInfo.phone}\n\nAlternatively, you can use the contact form on this page, and you can typically expect a response within 24 hours.`;
        pushBot(contactMsg);
        return;
      }

      if (intent === 'skills') {
        pushBot(skillsSummary());
        return;
      }

      if (intent === 'lead') {
        pushBot(handleLead());
        return;
      }

      if (intent === 'tech_search') {
        const qTokens = words(text);
        let foundTech = '';
        for (const t of qTokens) {
          if (techSet.has(t)) {
            foundTech = t;
            break;
          }
        }
        if (!foundTech) foundTech = qTokens.sort((a, b) => b.length - a.length)[0] || '';

        if (foundTech) {
          const results = searchByTech(foundTech);
          if (results.length) {
            const titles = Array.from(new Set(results.map((p) => p.title))).join('\n• ');
            pushBot(
              `Yes. ${foundTech} has been integrated into multiple projects including:\n• ${titles}`,
            );
            return;
          }
        }

        pushBot(professionalFallback(text));
        return;
      }

      if (intent === 'projects') {
        const results = searchProjects(text, 6);
        if (results.length) {
          const primary = results[0];
          pushBot(
            `Yes, Sajjad has experience relevant to that request.\n\n${formatProject(primary)}`,
          );
          if (results.length > 1) {
            const others = results
              .slice(1)
              .map((p) => `• ${p.title} (${p.year || ''})`)
              .join('\n');
            pushBot(`Other relevant projects:\n${others}`);
          }
          return;
        }

        pushBot(professionalFallback(text));
        return;
      }

      const tryProj = searchProjects(text, 4);
      if (tryProj.length) {
        pushBot(
          `I found these relevant projects:\n${tryProj.map((p) => `• ${p.title} — ${p.category}`).join('\n')}`,
        );
        return;
      }

      const qtk = words(text).find((w) => techSet.has(w));
      if (qtk) {
        const res = searchByTech(qtk);
        if (res.length) {
          pushBot(
            `Yes. ${qtk} has been used in these projects:\n${res.map((p) => `• ${p.title}`).join('\n')}`,
          );
          return;
        }
      }

      pushBot(professionalFallback(text));
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute bottom-24 right-0 w-[340px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-black/5 dark:border-white/10 overflow-hidden flex flex-col"
          >
            <div className="p-6 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#235347] to-[#4a8b7a] flex items-center justify-center p-0.5">
                    <img
                      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
                      className="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#0a0a0a]"
                      alt="Avatar"
                    />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#0a0a0a] rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-black dark:text-white leading-tight">
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs text-black/50 dark:text-white/50 font-medium tracking-wide uppercase">
                    {personalInfo.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-black dark:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.9,
                    transformOrigin: msg.isBot ? 'bottom left' : 'bottom right',
                  }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`max-w-[85%] p-4 text-[15px] leading-relaxed shadow-sm ${msg.isBot ? 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white self-start rounded-[1.5rem] rounded-tl-sm border border-zinc-100 dark:border-zinc-800' : 'bg-gradient-to-tr from-[#235347] to-[#4a8b7a] text-white self-end rounded-[1.5rem] rounded-tr-sm shadow-[0_5px_15px_rgba(35,83,71,0.2)]'}`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}

              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-[#1a1a1a] border border-zinc-100 dark:border-zinc-800 self-start rounded-[1.5rem] rounded-tl-sm px-5 py-4 flex items-center gap-1.5 shadow-sm"
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={endRef} className="h-1" />
            </div>

            <div className="p-4 bg-transparent border-t border-zinc-200/50 dark:border-zinc-800/50">
              <form
                onSubmit={handleSend}
                className="bg-white dark:bg-[#111] p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center shadow-sm relative z-20 focus-within:ring-2 focus-within:ring-[#235347]/30 transition-all"
              >
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  placeholder="Send a message..."
                  className="flex-1 bg-transparent text-sm px-4 py-2 text-black dark:text-white placeholder-zinc-400 focus:outline-none"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-[#235347] flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:scale-95 transition-all shadow-md group"
                >
                  <Send className="w-4 h-4 ml-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((s) => !s)}
        className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#235347] to-[#4a8b7a] text-white shadow-[0_10px_40px_rgba(35,83,71,0.5)] flex items-center justify-center z-50 overflow-hidden group"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
          className="relative z-10"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
              >
                <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#235347] z-20 shadow-lg"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
