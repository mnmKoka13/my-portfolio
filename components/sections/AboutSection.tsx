import SectionWrapper from '@/components/ui/SectionWrapper';
import FadeIn from '@/components/animations/FadeIn';
import profileData from '@/data/profile.json';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About Me">
      <div className="max-w-3xl mx-auto text-center">
        {profileData.description.map((text, index) => (
          <FadeIn key={index} delay={index * 0.2}>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              {text}
            </p>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
