import { FarmMap } from "@/components/FarmMap";

export default function InteractiveMap() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Farm Map</h1>
        
        <div className="mb-8">
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Explore our farm virtually! Click on the highlighted areas to learn more about
            different sections of Al Sorat Farm.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <FarmMap />
        </div>
      </div>
    </div>
  );
}
