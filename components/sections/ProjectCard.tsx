import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  title,
  selected = false,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl transition-all flex items-center justify-center",
        "px-3 py-2 text-center",
        "bg-white border border-slate-200",
        "hover:bg-slate-50 hover:-translate-y-0.5",
        selected
          ? "ring-2 ring-primary bg-slate-100 text-slate-900 scale-[1.02]"
          : "text-slate-500",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        "w-full h-14"
      )}
      tabIndex={0}
    >
      <span className="text-xs md:text-sm font-medium truncate">
        {title}
      </span>
    </button>
  );
}
