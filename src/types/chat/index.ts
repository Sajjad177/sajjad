export type ChatMessage = {
  id: number;
  text: string;
  isBot: boolean;
};

export type ChatIntent =
  | "greeting"
  | "about"
  | "contact"
  | "projects"
  | "skills"
  | "lead"
  | "tech_search"
  | "fallback";
