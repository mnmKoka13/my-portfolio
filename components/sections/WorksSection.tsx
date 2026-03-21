
"use client";
import { useState, useRef } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import ProjectCard from './ProjectCard';
import ProjectDetail from './ProjectDetail';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types/project';
import { cn } from "@/lib/utils";

export default function WorksSection() {
  const projects = projectsData as Project[];

  const INITIAL_COUNT = 9;

  const [activeProjectId, setActiveProjectId] = useState(
    projects[0]?.id || ''
  );
  const [showAll, setShowAll] = useState(false);

  const activeProject =
    projects.find((p) => p.id === activeProjectId) || projects[0];

  const hasMore = projects.length > INITIAL_COUNT;

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_COUNT);

  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleProjectClick = (id: string) => {
    setActiveProjectId(id);

    // 少し遅らせると安定（レンダリング待ち）
    setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <SectionWrapper
      id="works"
      title="Works"
      className="bg-secondary/30"
      fullWidth
    >
      {/* 上部：プロジェクト一覧 */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 py-3 md:py-6 mb-6">
          {/* プロジェクトカード */}
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              selected={activeProjectId === project.id}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}

          {/* See more カード */}
          {!showAll && hasMore && (
            <button
              onClick={() => setShowAll(true)}
              className={cn(
                "rounded-xl transition-all flex items-center justify-center",
                "px-3 py-2 text-center",
                "bg-white border border-dashed border-slate-300",
                "hover:bg-slate-50 hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900",
                "text-slate-500 hover:text-slate-900",
                "focus:outline-none focus:ring-2 focus:ring-primary",
                "w-full h-14"
              )}
            >
              <span className="text-xs md:text-sm font-medium">
                +{projects.length - INITIAL_COUNT} Projects
              </span>
            </button>
          )}
        </div>

        {/* Show less */}
        {showAll && hasMore && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAll(false)}
              className="text-sm text-slate-500 hover:text-slate-900 transition"
            >
              Show less ↑
            </button>
          </div>
        )}
      </div>

      {/* 下部：プロジェクト詳細 */}
      <div ref={detailRef} className="w-full max-w-5xl mx-auto">
        <ProjectDetail project={activeProject} />
      </div>
    </SectionWrapper>
  );
}