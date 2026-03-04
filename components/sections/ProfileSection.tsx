import SectionWrapper from '@/components/ui/SectionWrapper';
import FadeIn from '@/components/animations/FadeIn';
import profileData from '@/data/profile.json';

export default function ProfileSection() {
  return (
    <SectionWrapper id="profile" title="Profile" className="bg-white">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">名前</h3>
                <p className="text-gray-700">{profileData.name}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">職種</h3>
                <p className="text-gray-700">{profileData.role}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">自己紹介</h3>
                <div className="space-y-3">
                  {profileData.description.map((text, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
