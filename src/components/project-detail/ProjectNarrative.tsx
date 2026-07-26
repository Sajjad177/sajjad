"use client";

import { Box, CheckCircle2, Lightbulb } from "lucide-react";
import type { Project } from "@/types";

type ProjectNarrativeProps = {
  project: Project;
};

export const ProjectNarrative = ({ project }: ProjectNarrativeProps) => (
  <div className="lg:col-span-7 space-y-32">
    <section>
      <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#235347] dark:text-[#4a8b7a] mb-8">
        <Box className="w-4 h-4" /> 01. Context
      </h3>
      <p className="text-2xl md:text-3xl text-zinc-800 dark:text-zinc-200 leading-tight tracking-tight">
        {project.description}
      </p>
    </section>
    <section className="grid md:grid-cols-2 gap-12">
      <div>
        <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-6">
          <Lightbulb className="w-4 h-4" /> 02. The Challenge
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.challenge}
        </p>
      </div>
      <div>
        <h3 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-green-600 mb-6">
          <CheckCircle2 className="w-4 h-4" /> 03. The Solution
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.solution}
        </p>
      </div>
    </section>
    <section>
      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">
        04. Deliverables & Impact
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {project.impact?.map((text, index) => (
          <div key={index} className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <p className="text-black dark:text-white font-medium leading-tight">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
