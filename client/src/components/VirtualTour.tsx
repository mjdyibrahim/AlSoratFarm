import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PannellumViewer } from "./PannellumViewer";

// Farm locations with their panoramic images and descriptions
const tourLocations = [
  {
    id: "vet-area",
    title: "Veterinary Area",
    description: "Treatment area for animals and veterinary services.",
    image: "/images/MainHouse_Outdoors_Service.jpeg",
    hotspots: [],
  },
  {
    id: "staff-residence",
    title: "Staff Residence",
    description: "Living quarters for farm staff.",
    image: "/images/MainHouse_Side.jpeg",
    hotspots: [],
  },
  {
    id: "equestrian-house",
    title: "Equestrian Equipment",
    description: "Storage for riding equipment and horse care supplies.",
    image: "/images/Horses_Circle_Training_Donkey_Wagon.jpeg",
    hotspots: [],
  },
  {
    id: "donkey-house",
    title: "Donkey House",
    description: "Comfortable shelter for our donkeys.",
    image: "/images/Donkey_House.jpeg",
    hotspots: [],
  },
  {
    id: "maryanne-house",
    title: "Maryanne's House & Garden",
    description: "Residential area with garden and solar panel installation.",
    image: "/images/MainHouse_Garden.jpeg",
    hotspots: [],
  },
  {
    id: "experimental-plantation",
    title: "Experimental Plantation",
    description: "Area for testing new farming techniques and crops.",
    image: "/images/Plantation_GreenHouse.jpeg",
    hotspots: [],
  },
  {
    id: "naways-hq",
    title: "Naways HQ",
    description: "Administrative headquarters.",
    image: "/images/NawaysHQ_House.jpeg",
    hotspots: [],
  },
  {
    id: "horse-paddock",
    title: "Horse Paddock",
    description: "Main living area for horses.",
    image: "/images/Horses_From_Garden.jpeg",
    hotspots: [],
  }
];

export function VirtualTour() {
  const [searchParams] = React.useState(new URLSearchParams(window.location.search));
  const locationId = searchParams.get('location');
  const initialIndex = locationId 
    ? tourLocations.findIndex(loc => loc.id === locationId)
    : 0;
  const [currentLocationIndex, setCurrentLocationIndex] = React.useState(initialIndex !== -1 ? initialIndex : 0);
  const currentLocation = tourLocations[currentLocationIndex];

  const goToNextLocation = () => {
    setCurrentLocationIndex((prev) => 
      prev === tourLocations.length - 1 ? 0 : prev + 1
    );
  };

  const goToPreviousLocation = () => {
    setCurrentLocationIndex((prev) => 
      prev === 0 ? tourLocations.length - 1 : prev - 1
    );
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{currentLocation.title}</span>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousLocation}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentLocationIndex + 1} / {tourLocations.length}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextLocation}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <PannellumViewer
                image={currentLocation.image}
                pitch={10}
                yaw={180}
                hfov={110}
                hotSpots={currentLocation.hotspots}
                onLoad={() => {
                  console.log("panorama loaded");
                }}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">{currentLocation.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Drag to look around • Use mouse wheel to zoom • Click hotspots for information</p>
        </div>
      </div>
    </TooltipProvider>
  );
}