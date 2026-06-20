'use client';

import { useState, useRef } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import SectionWrapper from '@/components/ui/SectionWrapper';
import ProjectCard from './ProjectCard';
import PersonalWorkDetail from './PersonalWorkDetail';
import personalWorksData from '@/data/personal-works.json';
import type { PersonalWork } from '@/types';

export default function PersonalWorksSection() {
  const works = personalWorksData as PersonalWork[];

  const [activeId, setActiveId] = useState(works[0]?.id || '');
  const activeWork = works.find((w) => w.id === activeId) || works[0];
  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (id: string) => {
    setActiveId(id);
    setTimeout(() => {
      if (detailRef.current) {
        const headerHeight = window.innerWidth >= 768 ? 80 : 64;
        const top = detailRef.current.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <SectionWrapper id="personal-works" title="Personal Works" fullWidth>
      {works.length === 0 ? (
        <div className="w-full max-w-5xl mx-auto px-6 md:px-8 text-center text-slate-400 py-16">
          準備中
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 py-3 md:py-6 mb-6">
              {works.map((work, idx) => (
                <FadeIn key={work.id} delay={Math.min(idx * 0.08, 0.4)}>
                  <ProjectCard
                    title={work.title}
                    selected={activeId === work.id}
                    onClick={() => handleCardClick(work.id)}
                  />
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn key={activeWork.id} delay={(works.length + 1) * 0.08}>
            <div ref={detailRef} className="w-full max-w-5xl mx-auto">
              <PersonalWorkDetail work={activeWork} />
            </div>
          </FadeIn>
        </>
      )}
    </SectionWrapper>
  );
}
