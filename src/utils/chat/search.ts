import type { Project } from "@/types";

export const normalizeText = (value: string) => value.toLowerCase();

export const getWords = (value: string) => normalizeText(value).match(/\w+/g) || [];

export const getProjectSearchText = (project: Project) => {
  const parts = [
    project.title,
    project.category,
    project.description,
    project.challenge,
    project.solution,
  ].filter(Boolean);

  if (project.stack) {
    Object.values(project.stack).forEach((stack) => {
      if (stack) parts.push(stack.join(" "));
    });
  }

  return normalizeText(parts.join(" "));
};

export const extractProjectTechs = (projects: Project[]) => {
  const techSet = new Set<string>();
  const techToProjects = new Map<string, Project[]>();

  projects.forEach((project) => {
    if (!project.stack) return;

    Object.values(project.stack).forEach((stack) => {
      stack?.forEach((tech) => {
        const key = normalizeText(tech).replace(/[^a-z0-9]/g, "");
        techSet.add(key);
        techToProjects.set(key, [...(techToProjects.get(key) || []), project]);
      });
    });
  });

  return { techSet, techToProjects };
};

export const searchProjects = (
  query: string,
  projects: Project[],
  techSet: Set<string>,
  limit = 5
) => {
  const queryTokens = getWords(query);

  return projects
    .map((project) => {
      const searchText = getProjectSearchText(project);
      const score = queryTokens.reduce((total, token) => {
        const textScore = searchText.includes(token) ? 2 : 0;
        const techScore = techSet.has(token) ? 3 : 0;
        return total + textScore + techScore;
      }, project.liveLink ? 1 : 0);

      return { project, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.project)
    .slice(0, limit);
};

export const searchProjectsByTech = (
  query: string,
  techMap: Map<string, Project[]>
) => {
  const key = normalizeText(query).replace(/[^a-z0-9]/g, "");
  const directMatches = techMap.get(key) || [];

  if (directMatches.length) return directMatches;

  const partialMatches: Project[] = [];
  techMap.forEach((projects, tech) => {
    if (tech.includes(key) || key.includes(tech)) {
      projects.forEach((project) => partialMatches.push(project));
    }
  });

  return Array.from(new Set(partialMatches));
};
