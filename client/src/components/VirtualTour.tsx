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
    id: "entrance",
    title: "Farm Entrance",
    description: "Welcome to Al Sorat Farm! This is our main entrance area where your journey begins.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    hotspots: [
      {
        pitch: 0,
        yaw: 110,
        text: "Path to the stables",
      },
      {
        pitch: -5,
        yaw: -55,
        text: "Main reception area",
      },
    ],
  },
  {
    id: "stables",
    title: "Horse Stables",
    description: "Our well-maintained stables house our friendly horses and provide a comfortable environment for them.",
    image: "https://images.unsplash.com/photo-1553791685-0a05355314b4",
    hotspots: [
      {
        pitch: 0,
        yaw: 150,
        text: "Training area",
      },
      {
        pitch: -10,
        yaw: -80,
        text: "Equipment storage",
      },
    ],
  },
  {
    id: "garden",
    title: "Organic Garden",
    description: "Experience our thriving organic garden where we grow fresh produce and conduct farming experiments.",
    image: "https://images.unsplash.com/photo-1444392061186-9fc38f84f726",
    hotspots: [
      {
        pitch: -5,
        yaw: 110,
        text: "Vegetable patches",
      },
      {
        pitch: 0,
        yaw: -45,
        text: "Herb garden",
      },
    ],
  },
];

export function VirtualTour() {
  const [currentLocationIndex, setCurrentLocationIndex] = React.useState(0);
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