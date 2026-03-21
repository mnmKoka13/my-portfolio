import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  image: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({ title, image, selected = false, onClick }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl overflow-hidden transition-all flex flex-col items-center bg-white',
        'hover:shadow-md hover:-translate-y-0.5',
        selected ? 'ring-2 ring-primary scale-105 opacity-100 z-10' : 'opacity-70',
        'focus:outline-none focus:ring-2 focus:ring-primary',
        'w-32 md:w-40 h-24 md:h-28 mx-2 flex-shrink-0'
      )}
      tabIndex={0}
    >
      <div className="relative w-full h-20 md:h-24 bg-gray-100">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <span className="mt-2 text-xs md:text-sm font-medium text-slate-800 truncate w-full px-2 text-center">
        {title}
      </span>
    </button>
  );
}
