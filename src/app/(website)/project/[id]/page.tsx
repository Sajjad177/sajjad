"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  ProjectHeader,
  ProjectImageGallery,
  ProjectImageModal,
  ProjectNarrative,
  ProjectTechAside,
} from "@/components/project-detail";
import { useProject } from "@/hooks";

const SingleProjectPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const router = useRouter();
  const project = useProject(resolvedParams.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!project?.image || project.image.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentImageIndex((previous) => (previous + 1) % project.image!.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [project]);

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/projects");
    }
  };

  if (!project) return null;

  return (
    <main className="bg-[#f7efe2] dark:bg-[#1a1a1a] min-h-screen transition-colors duration-500 selection:bg-[#235347] selection:text-white pb-32">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#235347] dark:bg-[#4a8b7a] origin-left z-50"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12">
        <ProjectHeader project={project} onBack={handleBack} />
        <ProjectImageGallery
          currentImageIndex={currentImageIndex}
          project={project}
          onOpenModal={() => setIsModalOpen(true)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <ProjectNarrative project={project} />
          <ProjectTechAside project={project} />
        </div>
      </div>
      <ProjectImageModal
        currentImageIndex={currentImageIndex}
        isOpen={isModalOpen}
        project={project}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default SingleProjectPage;
