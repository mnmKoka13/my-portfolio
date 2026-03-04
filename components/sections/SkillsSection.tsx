import SectionWrapper from '@/components/ui/SectionWrapper';
import FadeIn from '@/components/animations/FadeIn';
import skillsData from '@/data/skills.json';

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" title="Skills" className="bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skillsData.map((category, categoryIndex) => (
            <FadeIn key={categoryIndex} delay={categoryIndex * 0.1}>
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-primary/20 rounded-full text-sm md:text-base font-medium hover:bg-primary/30 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
