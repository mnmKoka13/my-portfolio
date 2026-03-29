
"use client";
import { useState, useRef } from 'react';
import FadeIn from '@/components/animations/FadeIn';
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
  /** 一度でも See more で展開した後は、Show less 後の See more は既存カード分の delay を付けない */
  const [hasExpandedOnce, setHasExpandedOnce] = useState(false);

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
          {visibleProjects.map((project, idx) => {
            const staggerIndex = showAll
              ? idx >= INITIAL_COUNT
                ? idx - INITIAL_COUNT
                : 0
              : idx;
            const cardDelay = Math.min(staggerIndex * 0.08, 0.4);
            return (
              <FadeIn key={project.id} delay={cardDelay}>
                <ProjectCard
                  title={project.title}
                  selected={activeProjectId === project.id}
                  onClick={() => handleProjectClick(project.id)}
                />
              </FadeIn>
            );
          })}

          {/* See more カード */}
          {!showAll && hasMore && (
            <FadeIn
              delay={
                hasExpandedOnce ? 0 : visibleProjects.length * 0.08
              }
            >
              <button
                onClick={() => {
                  setHasExpandedOnce(true);
                  setShowAll(true);
                }}
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
            </FadeIn>
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
      <FadeIn key={activeProject.id} delay={(visibleProjects.length + 1) * 0.08}>
        <div ref={detailRef} className="w-full max-w-5xl mx-auto">
          <ProjectDetail project={activeProject} />
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}