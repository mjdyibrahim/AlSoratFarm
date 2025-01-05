import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Farm areas with their descriptions
const farmAreas = [
  {
    id: "stables",
    title: "Horse Stables",
    description: "Visit our well-maintained stables where we house our friendly horses.",
    x: 100,
    y: 150,
  },
  {
    id: "goat-area",
    title: "Goat Area",
    description: "Meet our friendly goats and learn about sustainable farming practices.",
    x: 250,
    y: 200,
  },
  {
    id: "organic-garden",
    title: "Organic Garden",
    description: "Explore our organic garden where we grow seasonal vegetables and herbs.",
    x: 400,
    y: 150,
  },
  {
    id: "education-center",
    title: "Education Center",
    description: "Join us for workshops and educational programs about farming and animals.",
    x: 300,
    y: 300,
  },
];

export function FarmMap() {
  return (
    <TooltipProvider>
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
        {/* Base map SVG */}
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full"
          style={{ background: "#f3f4f6" }}
        >
          {/* Farm outline */}
          <path
            d="M50 50 L750 50 L750 400 L50 400 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          
          {/* Decorative elements */}
          <path
            d="M100 100 Q400 150 700 100"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          
          {/* Add more decorative paths here */}
        </svg>

        {/* Interactive hotspots */}
        {farmAreas.map((area) => (
          <Tooltip key={area.id}>
            <TooltipTrigger asChild>
              <motion.div
                className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer"
                style={{ left: area.x, top: area.y }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
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
