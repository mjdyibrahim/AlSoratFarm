import { HeroSection } from "@/components/HeroSection";
import { ActivityCard } from "@/components/ActivityCard";
import { PhotoGallery } from "@/components/PhotoGallery";

const activities = [
  {
    title: "Animal Interaction",
    description: "Connect with our friendly farm animals including goats, horses, and donkeys.",
    imageUrl: "/images/Horses_From_Garden.jpeg",
    link: "/farm#animals"
  },
  {
    title: "Educational Programs",
    description: "School visits and hands-on learning experiences for all ages.",
    imageUrl: "/images/Tamer_Son_Horses_2.jpg",
    link: "/farm#education"
  },
  {
    title: "Organic Farming",
    description: "Experience sustainable farming practices and fresh produce.",
    imageUrl: "/images/Plantation_GreenHouse.jpeg",
    link: "/farm#farming"
  }
];

const galleryPhotos = [
  { url: "/images/Calf_Buffalo_FADA_Dahab.jpeg", alt: "Baby buffalo at the farm" },
  { url: "/images/Tamer_Son_Horses_5.jpg", alt: "Educational activities with horses" },
  { url: "/images/Cabbage_Plantation.jpeg", alt: "Organic farming" }
];

export default function Home() {
  return (
    <div>
      <HeroSection />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Farm Life</h2>
          <PhotoGallery photos={galleryPhotos} />
        </div>
      </section>
    </div>
  );
}