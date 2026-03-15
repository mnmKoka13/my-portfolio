'use client';

import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Work } from '@/types';

interface WorksCarouselProps {
  works: Work[];
}

export default function WorksCarousel({ works }: WorksCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {works.map((work, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={work.id}
                className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] min-w-0 px-3 md:px-4"
              >
                <div 
                  className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-500 h-[580px] md:h-[620px] flex flex-col ${
                    isActive 
                      ? 'opacity-100 scale-100 hover:-translate-y-1' 
                      : 'opacity-40 scale-95'
                  }`}
                >
                {/* Image */}
                <div className="relative w-full h-64 md:h-80 bg-gray-200 flex-shrink-0">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col overflow-hidden">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    {work.title}
                  </h3>
                  <p className="text-slate-700 mb-4 leading-relaxed line-clamp-3">
                    {work.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/20 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mt-auto">
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

                  {/* Period */}
                  {work.period && (
                    <p className="text-sm text-slate-500 mt-2">{work.period}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-[2%] md:left-[8%] lg:left-[18%] top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        aria-label="前のスライド"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-[5%] md:right-[8%] lg:right-[18%] top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
        aria-label="次のスライド"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
