import { HeroSection } from "@/components/HeroSection";
import { ActivityCard } from "@/components/ActivityCard";
import { PhotoGallery } from "@/components/PhotoGallery";

const activities = [
  {
    title: "Animal Interaction",
    description: "Connect with our friendly farm animals including goats, horses, and donkeys.",
    imageUrl: "https://images.unsplash.com/photo-1535907309959-db0f3e78aa54",
    link: "/farm#animals"
  },
  {
    title: "Educational Programs",
    description: "School visits and hands-on learning experiences for all ages.",
    imageUrl: "https://images.unsplash.com/photo-1484557985045-edf25e08da73",
    link: "/farm#education"
  },
  {
    title: "Organic Farming",
    description: "Experience sustainable farming practices and fresh produce.",
    imageUrl: "https://images.unsplash.com/photo-1719957770295-82515e051011",
    link: "/farm#farming"
  }
];

const galleryPhotos = [
  { url: "https://images.unsplash.com/photo-1586348323398-678d15d9e87f", alt: "Farm animals" },
  { url: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6", alt: "Educational activities" },
  { url: "https://images.unsplash.com/photo-1654674611706-53157118a4a4", alt: "Organic farming" }
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
