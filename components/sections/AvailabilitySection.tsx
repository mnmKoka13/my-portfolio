import SectionWrapper from '@/components/ui/SectionWrapper';
import FadeIn from '@/components/animations/FadeIn';
import availabilityData from '@/data/availability.json';

export default function AvailabilitySection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'limited':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'unavailable':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return '受注可能';
      case 'limited':
        return '一部受注可能';
      case 'unavailable':
        return '受注不可';
      default:
        return '不明';
    }
  };

  return (
    <SectionWrapper id="availability" title="Availability">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
            <div className="mb-6">
              <span
                className={`inline-block px-6 py-3 rounded-full text-lg font-bold border-2 ${getStatusColor(
                  availabilityData.status
                )}`}
              >
                {getStatusLabel(availabilityData.status)}
              </span>
            </div>
            <p className="text-xl md:text-2xl font-medium text-gray-700">
              {availabilityData.message}
            </p>
          </div>
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
