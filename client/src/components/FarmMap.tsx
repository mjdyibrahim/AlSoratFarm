import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLocation } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FARM_IMAGE_RATIO = 552 / 1626;
interface FarmMapProps {
  className?: string;
}
// Ensure the image path is correct
const FARM_IMAGE_URL = "/images/AlSoratFarm.jpg";

// Farm areas with their descriptions
const farmAreas = [
  {
    id: "vet-area",
    title: "Veterinary Area",
    description: "Treatment area for animals and veterinary services.",
    x: "80%",
    y: "90%",
  },
  {
    id: "staff-residence",
    title: "Staff Residence",
    description: "Living quarters for farm staff.",
    x: "80%",
    y: "85%",
  },
  {
    id: "equestrian-house",
    title: "Equestrian Equipment",
    description: "Storage for riding equipment and horse care supplies.",
    x: "83%",
    y: "81%",
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    description: "Visitor and staff facilities.",
    x: "85%",
    y: "79%",
  },
  {
    id: "goat-houses",
    title: "Goat Houses",
    description: "Home to our friendly goat population.",
    x: "80%",
    y: "75%",
  },
  {
    id: "cow-house",
    title: "Cow House",
    description: "Shelter for our cattle.",
    x: "80%",
    y: "62%",
  },
  {
    id: "donkey-house",
    title: "Donkey House",
    description: "Comfortable shelter for our donkeys.",
    x: "80%",
    y: "65%",
  },
  {
    id: "sick-horse-house",
    title: "Sick Horse House",
    description:
      "Special care facility for horses requiring medical attention.",
    x: "80%",
    y: "57%",
  },
  {
    id: "maryanne-house",
    title: "Maryanne's House & Garden",
    description: "Residential area with garden and solar panel installation.",
    x: "15%",
    y: "90%",
  },
  {
    id: "experimental-plantation",
    title: "Experimental Plantation",
    description: "Area for testing new farming techniques and crops.",
    x: "20%",
    y: "70%",
  },
  {
    id: "staff-hq",
    title: "Staff HQ",
    description: "Main administrative building for farm operations.",
    x: "50%",
    y: "65%",
  },
  {
    id: "horse-running-area",
    title: "Horse Running Area",
    description: "Open space for horse exercise and training.",
    x: "50%",
    y: "55%",
  },
  {
    id: "naways-hq",
    title: "Naways HQ",
    description: "Administrative headquarters.",
    x: "80%",
    y: "33%",
  },
  {
    id: "horse-paddock",
    title: "Horse Paddock",
    description: "Main living area for horses.",
    x: "20%",
    y: "40%",
  },
];

export function FarmMap() {
  const [_, setLocation] = useLocation();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleAreaClick = (areaId: string) => {
    setLocation(`/virtual-tour?location=${areaId}`);
  };

  return (
    <TooltipProvider>
      {/* 
        This container enforces the correct aspect ratio to match the image. 
        If you know the exact ratio, you can do something like aspect-[552/1626].
      */}
      <div
        className="relative w-full aspect-[552/1626] overflow-hidden"
      >
        {/* The actual farm satellite image as a background */}
        {!imageError ? (
          <img
            src={FARM_IMAGE_URL}
            alt="Al Sorat Farm Satellite View"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={(e) => {
              console.log('Image loaded:', e.currentTarget.naturalWidth, 'x', e.currentTarget.naturalHeight);
              setImageLoaded(true);
            }}
            onError={(e) => {
              console.error('Image failed to load:', e);
              setImageError(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Farm map image could not be loaded</p>
          </div>
        )}

        {/* Now we place the hotspots absolutely on top of the image */}
        {imageLoaded && farmAreas.map((area) => (
          <Tooltip key={area.id}>
            <TooltipTrigger asChild>
              <motion.div
                className="absolute -ml-4 -mt-8 cursor-pointer"
                style={{ left: area.x, top: area.y }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAreaClick(area.id)}
              >
                <MapPin className="h-8 w-8 text-primary animate-bounce" />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <Card>
                <CardContent className="p-3">
                  <h3 className="font-semibold mb-1">{area.title}</h3>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </CardContent>
              </Card>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
