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
  // Right Zone (Blue)
  {
    id: "vet-clinic",
    title: "Vet Clinic",
    description: "Treatment area for animals and veterinary services.",
    x: 450,
    y: 650,
    zone: "right"
  },
  {
    id: "sick-horse-house",
    title: "Sick Horse House",
    description: "Special care facility for horses requiring medical attention.",
    x: 400,
    y: 650,
    zone: "right"
  },
  {
    id: "donkey-house",
    title: "Donkey House",
    description: "Comfortable shelter for our donkeys.",
    x: 350,
    y: 650,
    zone: "right"
  },
  {
    id: "cow-house",
    title: "Cow House",
    description: "Shelter for our cattle.",
    x: 300,
    y: 650,
    zone: "right"
  },
  {
    id: "goat-house",
    title: "Goat House",
    description: "Home to our friendly goat population.",
    x: 250,
    y: 650,
    zone: "right"
  },
  {
    id: "bathrooms",
    title: "Bathrooms",
    description: "Visitor and staff facilities.",
    x: 200,
    y: 650,
    zone: "right"
  },
  {
    id: "equestrian-house",
    title: "Equestrian Equipment",
    description: "Storage for riding equipment and horse care supplies.",
    x: 150,
    y: 650,
    zone: "right"
  },
  {
    id: "staff-residence",
    title: "Staff Residence",
    description: "Living quarters for farm staff.",
    x: 100,
    y: 650,
    zone: "right"
  },

  // Left Zone (Green)
  {
    id: "horse-paddock",
    title: "Horse Paddock",
    description: "Horse paddock and running circle.",
    x: 450,
    y: 150,
    zone: "left"
  },
  {
    id: "horse-running-circle",
    title: "Horse Running Circle",
    description: "Open space for horse exercise and training.",
    x: 350,
    y: 150,
    zone: "left"
  },
  {
    id: "staff-hq",
    title: "Staff HQ",
    description: "Main administrative building for farm operations.",
    x: 300,
    y: 150,
    zone: "left"
  },
  {
    id: "experimental-plantation",
    title: "Experimental Plantation",
    description: "Area for testing new farming techniques and crops.",
    x: 200,
    y: 150,
    zone: "left"
  },
  {
    id: "maryanne-house",
    title: "Maryanne's House & Garden",
    description: "Residential area with garden and solar panel installation.",
    x: 100,
    y: 150,
    zone: "left"
  }
];

export function FarmMap() {
  return (
    <TooltipProvider>
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
        >
          {/* Background Zones */}
          {/* Left Zone (Green) */}
          <rect x="50" y="50" width="500" height="300" fill="#e2f5e2" />
          {/* Central Pathway (Gray) */}
          <rect x="50" y="350" width="500" height="100" fill="#f0f0f0" />
          {/* Right Zone (Blue) */}
          <rect x="50" y="450" width="500" height="300" fill="#e2f0f5" />

          {/* Section Dividers - Right Zone */}
          {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
            <path
              key={`right-divider-${i}`}
              d={`M${50 + ((i + 1) * 500) / 8} 450 V750`}
              stroke="#666"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}

          {/* Section Dividers - Left Zone */}
          {[1, 2, 3, 4].map((_, i) => (
            <path
              key={`left-divider-${i}`}
              d={`M${50 + ((i + 1) * 500) / 5} 50 V350`}
              stroke="#666"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}

          {/* Zone Labels */}
          <text x="300" y="30" className="text-sm font-medium" textAnchor="middle" transform="rotate(-90 300 30)">
            Left Zone
          </text>
          <text x="300" y="400" className="text-sm font-medium" textAnchor="middle" transform="rotate(-90 300 400)">
            Central
          </text>
          <text x="300" y="600" className="text-sm font-medium" textAnchor="middle" transform="rotate(-90 300 600)">
            Right Zone
          </text>

          {/* Entry Door */}
          <path
            d="M50 400 H100"
            stroke="#666"
            strokeWidth="4"
            strokeDasharray="5,5"
          />

          {/* Main Border */}
          <path
            d="M50 50 H550 V750 H50 V50"
            fill="none"
            stroke="#666"
            strokeWidth="2"
          />
        </svg>

        {/* Interactive Hotspots */}
        {farmAreas.map((area) => (
          <Tooltip key={area.id}>
            <TooltipTrigger asChild>
              <motion.div
                className={`absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer ${
                  area.zone === 'left' 
                    ? 'bg-green-500/80' 
                    : area.zone === 'right' 
                    ? 'bg-blue-500/80' 
                    : 'bg-gray-500/80'
                }`}
                style={{
                  left: area.x,
                  top: area.y,
                  borderRadius: '50%',
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                  }
                }}
              />
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