import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  title,
  children,
  className = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24 px-6 md:px-8',
        'w-full max-w-6xl mx-auto',
        className
      )}
    >
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
