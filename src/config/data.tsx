import { Github, Instagram, Linkedin } from "lucide-react";
import React from "react";

export const navLinks = [
  { name: "About me", href: "#about" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "#services" },
];

export const personalInfo = {
  name: "Sajjad Hossain",
  title: "Full Stack Developer",
  location: "Dhaka, Bangladesh",
  email: "sajjadhossainx06@gmail.com",
  phone: "01907488316",
  aboutHeading: "Building digital products, brands, and experience.",
  aboutText: "I build scalable and efficient web applications that solve real-world problems.",
};

export const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sajjadsajjad",
    icon: <Linkedin className="w-4 h-4" />,
    color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
  },
  {
    name: "GitHub",
    href: "https://github.com/Sajjad177",
    icon: <Github className="w-4 h-4" />,
    color: "hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white",
  },
  {
    name: "Instagram",
    href: "#",
    icon: <Instagram className="w-4 h-4" />,
    color: "hover:bg-[#E4405F]/10 hover:text-[#E4405F]",
  },
];

export const workingProcessSteps = [
  {
    id: '01',
    title: 'Requirement Discussion',
    description: 'We address key problems directly in the headline. Understand your goals and capture requirements.',
    color: 'orange',
  },
  {
    id: '02',
    title: 'Planning & Architecture',
    description: 'Showcase the main benefits of your product. Each requirement mapped gracefully into system architecture.',
    color: 'blue',
  },
  {
    id: '03',
    title: 'Development',
    description: 'We build your product using standard guidelines. Writing clean, scalable code for maximum value.',
    color: 'purple',
  },
  {
    id: '04',
    title: 'Testing',
    description: 'List core functionalities clearly. Connect features to rigorous quality testing and security checks.',
    color: 'rose',
  },
  {
    id: '05',
    title: 'Deployment',
    description: 'Finalizing the setup and pushing it live. A seamless transition into the production environment.',
    color: 'emerald',
  },
];

export interface ColorTheme {
  border: string;
  shadowLayer: string;
  textHighlight: string;
  pin: string;
  cardBg: string;
}

export const colorMap: Record<string, ColorTheme> = {
  orange: {
    border: 'border-orange-100 dark:border-orange-900/30',
    shadowLayer: 'bg-[#FFF9F0] dark:bg-orange-950/20',
    textHighlight: 'text-orange-500 dark:text-orange-400',
    pin: 'from-orange-400 to-orange-600 shadow-orange-500/30',
    cardBg: 'bg-card dark:bg-zinc-900',
  },
  blue: {
    border: 'border-blue-100 dark:border-blue-900/30',
    shadowLayer: 'bg-[#F0F6FF] dark:bg-blue-950/20',
    textHighlight: 'text-blue-500 dark:text-blue-400',
    pin: 'from-blue-400 to-blue-600 shadow-blue-500/30',
    cardBg: 'bg-card dark:bg-zinc-900',
  },
  purple: {
    border: 'border-purple-100 dark:border-purple-900/30',
    shadowLayer: 'bg-[#F8F0FF] dark:bg-purple-950/20',
    textHighlight: 'text-purple-500 dark:text-purple-400',
    pin: 'from-purple-400 to-purple-600 shadow-purple-500/30',
    cardBg: 'bg-card dark:bg-zinc-900',
  },
  rose: {
    border: 'border-rose-100 dark:border-rose-900/30',
    shadowLayer: 'bg-[#FFF0F2] dark:bg-rose-950/20',
    textHighlight: 'text-rose-500 dark:text-rose-400',
    pin: 'from-rose-400 to-rose-600 shadow-rose-500/30',
    cardBg: 'bg-card dark:bg-zinc-900',
  },
  emerald: {
    border: 'border-emerald-100 dark:border-emerald-900/30',
    shadowLayer: 'bg-[#F0FDF4] dark:bg-emerald-950/20',
    textHighlight: 'text-emerald-500 dark:text-emerald-400',
    pin: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30',
    cardBg: 'bg-card dark:bg-zinc-900',
  },
};
