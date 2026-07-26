import { personalInfo } from "@/config/data";
import type { Project } from "@/types";
import { detectChatIntent } from "./intent";
import {
  formatProjectResponse,
  getLeadResponse,
  getProfessionalFallback,
  getSkillsSummary,
} from "./responses";
import { getWords, searchProjects, searchProjectsByTech } from "./search";

type ChatResponseContext = {
  projects: Project[];
  techSet: Set<string>;
  techToProjects: Map<string, Project[]>;
};

export const buildChatResponses = (
  text: string,
  context: ChatResponseContext
): string[] => {
  const { projects, techSet, techToProjects } = context;
  const intent = detectChatIntent(text);

  if (intent === "greeting") {
    return ["Hello! I'm Sajjad Hossain's virtual assistant. How can I help you today?"];
  }

  if (intent === "about") {
    return [
      `${personalInfo.name}\n${personalInfo.title}\n${personalInfo.aboutHeading}\n${personalInfo.aboutText}\n\nLocation: ${personalInfo.location}`,
    ];
  }

  if (intent === "contact") {
    return [
      `I'd be glad to help you get in touch with Sajjad Hossain. You can reach him directly via:\n\nEmail: ${personalInfo.email}\nPhone / WhatsApp: ${personalInfo.phone}\n\nAlternatively, you can use the contact form on this page, and you can typically expect a response within 24 hours.`,
    ];
  }

  if (intent === "skills") return [getSkillsSummary(techSet)];
  if (intent === "lead") return [getLeadResponse()];
  if (intent === "tech_search") return buildTechResponses(text, techSet, techToProjects);
  if (intent === "projects") return buildProjectResponses(text, projects, techSet);

  return buildFallbackSearchResponses(text, projects, techSet);
};

const buildTechResponses = (
  text: string,
  techSet: Set<string>,
  techToProjects: Map<string, Project[]>
) => {
  const tokens = getWords(text);
  const foundTech =
    tokens.find((token) => techSet.has(token)) ||
    tokens.sort((a, b) => b.length - a.length)[0] ||
    "";
  const results = foundTech ? searchProjectsByTech(foundTech, techToProjects) : [];

  if (!results.length) return [getProfessionalFallback()];

  const titles = Array.from(new Set(results.map((project) => project.title))).join("\n• ");
  return [`Yes. ${foundTech} has been integrated into multiple projects including:\n• ${titles}`];
};

const buildProjectResponses = (
  text: string,
  projects: Project[],
  techSet: Set<string>
) => {
  const results = searchProjects(text, projects, techSet, 6);

  if (!results.length) return [getProfessionalFallback()];

  const responses = [
    `Yes, Sajjad has experience relevant to that request.\n\n${formatProjectResponse(results[0])}`,
  ];

  if (results.length > 1) {
    const others = results
      .slice(1)
      .map((project) => `• ${project.title} (${project.year || ""})`)
      .join("\n");
    responses.push(`Other relevant projects:\n${others}`);
  }

  return responses;
};

const buildFallbackSearchResponses = (
  text: string,
  projects: Project[],
  techSet: Set<string>
) => {
  const matches = searchProjects(text, projects, techSet, 4);

  if (!matches.length) return [getProfessionalFallback()];

  return [
    `I found these relevant projects:\n${matches.map((project) => `• ${project.title} — ${project.category}`).join("\n")}`,
  ];
};
