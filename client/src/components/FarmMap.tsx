import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
const FARM_IMAGE_URL = "/images/AlSoratFarm.jpg";

// Farm areas with their descriptions
const farmAreas = [
  {
    id: "vet-area",
    title: "Veterinary Area",
    description: "Treatment area for animals and veterinary services.",
    x: 600,
    y: 100,
  },
  {
    id: "staff-residence",
    title: "Staff Residence",
    description: "Living quarters for farm staff.",
    x: 600,
    y: 150,
  },
  {
    id: "equestrian-house",
    title: "Equestrian Equipment",
    description: "Storage for riding equipment and horse care supplies.",
    x: 600,
    y: 200,
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    description: "Visitor and staff facilities.",
    x: 600,
    y: 250,
  },
  {
    id: "goat-houses",
    title: "Goat Houses",
    description: "Home to our friendly goat population.",
    x: 600,
    y: 300,
  },
  {
    id: "cow-house",
    title: "Cow House",
    description: "Shelter for our cattle.",
    x: 600,
    y: 350,
  },
  {
    id: "donkey-house",
    title: "Donkey House",
    description: "Comfortable shelter for our donkeys.",
    x: 600,
    y: 400,
  },
  {
    id: "sick-horse-house",
    title: "Sick Horse House",
    description:
      "Special care facility for horses requiring medical attention.",
    x: 600,
    y: 450,
  },
  {
    id: "maryanne-house",
    title: "Maryanne's House & Garden",
    description: "Residential area with garden and solar panel installation.",
    x: 200,
    y: 150,
  },
  {
    id: "experimental-plantation",
    title: "Experimental Plantation",
    description: "Area for testing new farming techniques and crops.",
    x: 200,
    y: 275,
  },
  {
    id: "staff-hq",
    title: "Staff HQ",
    description: "Main administrative building for farm operations.",
    x: 200,
    y: 375,
  },
  {
    id: "horse-running-area",
    title: "Horse Running Area",
    description: "Open space for horse exercise and training.",
    x: 200,
    y: 450,
  },
  {
    id: "naways-hq",
    title: "Naways HQ",
    description: "Administrative headquarters.",
    x: 600,
    y: 525,
  },
  {
    id: "horse-paddock",
    title: "Horse Paddock",
    description: "Main living area for horses.",
    x: 200,
    y: 525,
  },
];

export function FarmMap() {
  return (
    <TooltipProvider>
      {/* 
        This container enforces the correct aspect ratio to match the image. 
        If you know the exact ratio, you can do something like aspect-[552/1626].
      */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${FARM_IMAGE_RATIO}` }}
      >
        {/* The actual farm satellite image as a background */}
        <img
          src={FARM_IMAGE_URL}
          alt="Al Sorat Farm Satellite View"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Now we place the hotspots absolutely on top of the image */}
        {farmAreas.map((area) => (
          <Tooltip key={area.id}>
            <TooltipTrigger asChild>
              <motion.div
                className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer"
                style={{ left: area.x, top: area.y }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* You can style this however you like */}
                <div className="w-full h-full rounded-full bg-primary/80 animate-pulse" />
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
