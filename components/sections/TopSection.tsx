import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import profileData from '@/data/profile.json';

export default function TopSection() {
  return (
    <section
      id="top"
      className="min-h-screen flex items-center justify-center px-6 md:px-8 pt-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn delay={0.2}>
          <div className="mb-8 md:mb-12">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <Image
                src={profileData.image}
                alt={profileData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
            {profileData.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 md:mb-8">
            {profileData.role}
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            {profileData.bio}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
