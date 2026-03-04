import SectionWrapper from '@/components/ui/SectionWrapper';
import WorksCarousel from '@/components/ui/WorksCarousel';
import FadeIn from '@/components/animations/FadeIn';
import worksData from '@/data/works.json';

export default function WorksSection() {
  return (
    <SectionWrapper id="works" title="Works">
      <FadeIn>
        <WorksCarousel works={worksData} />
      </FadeIn>
    </SectionWrapper>
  );
}
