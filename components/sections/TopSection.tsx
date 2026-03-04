import FadeIn from '@/components/animations/FadeIn';
import profileData from '@/data/profile.json';

export default function TopSection() {
  return (
    <section
      id="top"
      className="relative px-6 md:px-8 py-20 min-h-screen overflow-hidden bg-secondary/50"
    >
      {/* Content */}
      <div className="relative z-10 w-full h-full min-h-[calc(100vh-10rem)]">
        {/* テキストエリア - 左下 */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md">
          <FadeIn delay={0.2} useInView={false}>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {profileData.role}
            </p>
          </FadeIn>

          <FadeIn delay={0.4} useInView={false}>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {profileData.bio}
            </p>
          </FadeIn>
        </div>

        {/* 名前 - 右上の白丸エリア */}
        <div className="absolute -top-10 -right-10 md:-top-16 md:-right-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-10 md:p-16 shadow-lg md:shadow-xl w-[400px] h-[400px] md:w-[550px] md:h-[550px] flex flex-col items-center justify-center text-center">
            <FadeIn delay={0.6} useInView={false}>
              <h1 className="text-3xl md:text-5xl font-bold">
                {profileData.name}
              </h1>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
