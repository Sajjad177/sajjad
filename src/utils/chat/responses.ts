import { personalInfo } from "@/config/data";
import type { Project } from "@/types";

export const formatProjectResponse = (project: Project) => {
  const techs = Object.values(project.stack || {}).flat().filter(Boolean);
  const impact = project.impact?.length
    ? project.impact.map((item) => `• ${item}`).join("\n")
    : "";

  return [
    `Project: ${project.title}`,
    `Category: ${project.category}`,
    project.description ? `Description:\n${project.description}` : "",
    techs.length ? `Technologies: ${techs.join(", ")}` : "",
    impact ? `Impact:\n${impact}` : "",
    project.liveLink ? `Live URL: ${project.liveLink}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
};

export const getProfessionalFallback = () =>
  "While there isn't currently a publicly showcased project that exactly matches that requirement, " +
  "Sajjad has extensive experience building scalable web applications using modern technologies such as React, Next.js, Node.js, Express, MongoDB, TypeScript, Stripe, Socket.IO, WebRTC, and cloud-based architectures. " +
  "If you share a few details about your idea, Sajjad can propose an approach and timeline — or you can contact him at " +
  `${personalInfo.email} (or use /#contact). Typical response time is within 24 hours.`;

export const getLeadResponse = () =>
  `Thank you for sharing your project idea. I'd be happy to learn more about your requirements. Please provide:\n\n` +
  `• Project goals\n• Core features\n• Target users\n• Timeline\n• Budget (optional)\n\n` +
  `After reviewing the details, Sajjad can recommend an implementation strategy and arrange a meeting. Email: ${personalInfo.email} \nTypical response time is within 24 hours.`;

export const getSkillsSummary = (techSet: Set<string>) => {
  const techs = Array.from(techSet);

  if (!techs.length) {
    return "Key skills: MERN (React, Next.js), Node.js, MongoDB, Express, TypeScript, Tailwind CSS.";
  }

  const formattedTechs = techs.map((tech) =>
    tech
      .split(/\s+/)
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(" ")
  );

  return `Key skills: ${formattedTechs.join(", ")}.`;
};
