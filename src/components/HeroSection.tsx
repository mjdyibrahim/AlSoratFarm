import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <div className="relative bg-gray-900 min-h-[600px] flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/MainHouse_Garden.jpeg")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.6)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Come Connect With The Earth And Animals.
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Experience the joy of connecting with nature through our educational and recreational activities at Al Sorat Farm.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/farm">Explore Our Farm</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-transparent hover:text-white border-white">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}