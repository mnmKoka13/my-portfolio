import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function SectionWrapper({
  id,
  title,
  children,
  className = '',
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full py-20 md:py-24',
        className
      )}
    >
      {fullWidth ? (
        <>
          {title && (
            <div className="mx-auto max-w-6xl px-6 md:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
                {title}
              </h2>
            </div>
          )}
          {children}
        </>
      ) : (
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
              {title}
            </h2>
          )}
          {children}
        </div>
      )}
    </section>
  );
}
