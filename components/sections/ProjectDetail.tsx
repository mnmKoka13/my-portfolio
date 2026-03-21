import Image from 'next/image';
import { Project } from '@/types/works';
import { cn } from '@/lib/utils';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="w-full">
      {/* ヒーローエリア */}
      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-8">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{project.title}</h2>
          {project.period && (
            <span className="text-white/80 text-sm md:text-base mb-1">{project.period}</span>
          )}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {project.tech.map((t) => (
                <span key={t} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 詳細コンテンツ */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左カラム：Overview */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Overview</h3>
          <p className="text-slate-800 whitespace-pre-line">{project.description}</p>
        </div>
        {/* 右カラム：Role, Tech, Result */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Role</h3>
            <p className="text-slate-800">{project.role}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Result</h3>
            <p className="text-slate-800">{project.result}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
