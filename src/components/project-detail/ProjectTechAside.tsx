"use client";

import type { Project } from "@/types";

type ProjectTechAsideProps = {
  project: Project;
};

export const ProjectTechAside = ({ project }: ProjectTechAsideProps) => (
  <aside className="lg:col-span-5">
    <div className="sticky top-12 space-y-12">
      <div className="flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
          Technical Specifications
        </h3>
      </div>
      <div className="space-y-12 pl-4 border-l border-zinc-200 dark:border-zinc-800">
        <div className="group">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#235347] dark:text-[#4a8b7a] mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Frontend Environment
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {project.stack?.frontend?.map((tech) => (
              <span key={tech} className="text-lg md:text-xl font-medium text-black dark:text-white hover:italic transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="group">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            Backend Infrastructure
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {project.stack?.backend?.map((tech) => (
              <span key={tech} className="text-lg md:text-xl font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </aside>
);
