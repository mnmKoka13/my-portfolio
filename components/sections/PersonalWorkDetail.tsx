import { PersonalWork } from '@/types';
import ImageCarousel from '@/components/ui/ImageCarousel';

interface PersonalWorkDetailProps {
  work: PersonalWork;
}

export default function PersonalWorkDetail({ work }: PersonalWorkDetailProps) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-auto md:flex-shrink-0 flex justify-center">
        <div className={work.type === 'mobile' ? 'w-48 md:w-56' : 'w-64 md:w-80'}>
          <ImageCarousel
            images={work.images}
            alt={work.title}
            className={
              work.type === 'mobile'
                ? 'relative w-full aspect-[9/19] rounded-2xl overflow-hidden bg-slate-100 shadow-lg'
                : 'relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 shadow-lg'
            }
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Overview</h3>
          <p className="text-slate-800 whitespace-pre-line">{work.description}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Status</h3>
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
            {work.status}
          </span>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {work.tech.map((t) => (
              <span key={t} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {(work.url || work.github) && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase text-slate-500 mb-2">Links</h3>
            <div className="flex gap-4">
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Website →
                </a>
              )}
              {work.github && (
                <a
                  href={work.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
