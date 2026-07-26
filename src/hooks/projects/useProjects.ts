"use client";

import { useEffect, useState } from "react";
import type { Project, ProjectRecord } from "@/types";

const toProjectList = (data: ProjectRecord): Project[] =>
  Object.entries(data).map(([id, project]) => ({ id, ...project }));

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data: ProjectRecord) => {
        setProjects(toProjectList(data));
      })
      .catch(() => {
        setProjects([]);
      });
  }, []);

  return projects;
};

export const useProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data: ProjectRecord) => {
        const selectedProject = data[id];
        setProject(selectedProject ? { id, ...selectedProject } : null);
      })
      .catch(() => {
        setProject(null);
      });
  }, [id]);

  return project;
};
