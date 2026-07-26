import type { ChatIntent } from "@/types";
import { normalizeText } from "./search";

export const detectChatIntent = (text: string): ChatIntent => {
  const value = normalizeText(text);

  if (/^(hi|hello|hey|good)/.test(value)) return "greeting";
  if (/about|who are you|introduce|tell me about|yourself/.test(value)) return "about";
  if (/contact|email|phone|whatsapp|reach|get in touch/.test(value)) return "contact";
  if (/project|projects|portfolio|work|showcase|case study/.test(value)) return "projects";
  if (/skill|skills|stack|technolog|react|node|figma|tailwind/.test(value)) return "skills";
  if (/idea|build|can you build|do you build|i want to build|i have an idea|i have a project|need a developer|looking for a developer/.test(value)) {
    return "lead";
  }
  if (/stripe|mongo|mongodb|socket.io|socketio|webrtc|node|react|next|typescript|express|jwt|cloudinary/.test(value)) {
    return "tech_search";
  }

  return "fallback";
};
