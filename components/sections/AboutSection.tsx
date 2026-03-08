import SectionWrapper from '@/components/ui/SectionWrapper';
import FadeIn from '@/components/animations/FadeIn';
import aboutData from '@/data/top.json';
import React from 'react';

// export default function AboutSection() {
//   return (
//     <SectionWrapper id="about" title="About This Site" className="bg-white">
//       <div className="mx-auto text-center" style={{ maxWidth: '65ch' }}>
//         {aboutData.about.map((paragraph, index) => {
//           // 技術スタックのプレースホルダーを置換
//           const hasTechStack = paragraph.includes('{{techStack}}');
//           const [before, after] = hasTechStack ? paragraph.split('{{techStack}}') : ['', ''];
          
//           return (
//             <FadeIn key={index} delay={index * 0.2}>
//               <p 
//                 className={`text-lg text-slate-700 ${index > 0 ? 'mt-[1.2em]' : ''}`}
//                 style={{ lineHeight: '1.9', whiteSpace: 'pre-line' }}
//               >
//                 {hasTechStack ? (
//                   <>
//                     {before}
//                     <span className="font-semibold text-slate-900">{aboutData.techStack}</span>
//                     {after}
//                   </>
//                 ) : (
//                   paragraph
//                 )}
//               </p>
//             </FadeIn>
//           );
//         })}
//       </div>
//     </SectionWrapper>
//   );
// }

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About This Site" className="bg-white">
      <div className="mx-auto text-center max-w-[65ch]">
        {aboutData.about.map((paragraph, index) => {
          const parts = paragraph.split('{{techStack}}');

          return (
            <FadeIn key={index} delay={index * 0.2}>
              <p
                className={`text-lg text-slate-700 leading-[1.9] whitespace-pre-line ${
                  index > 0 ? "mt-[1.2em]" : ""
                }`}
              >
                {parts.map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <span className="font-semibold text-slate-900">
                        {aboutData.techStack}
                      </span>
                    )}
                    {part}
                  </React.Fragment>
                ))}
              </p>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}