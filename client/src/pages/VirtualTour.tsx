import { VirtualTour } from "@/components/VirtualTour";

export default function VirtualTourPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Virtual Farm Tour</h1>
        
        <div className="mb-8">
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Experience Al Sorat Farm from anywhere! Take a virtual tour through our
            facilities and explore different areas of the farm with our interactive
            360-degree panoramic views.
          </p>
        </div>

        <VirtualTour />
      </div>
    </div>
  );
}
