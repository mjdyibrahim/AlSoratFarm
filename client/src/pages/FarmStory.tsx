import { Timeline } from "@/components/Timeline";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    id: "1",
    year: 2005,
    title: "The Beginning",
    description: "Al Sorat Farm was established as a small educational center with a focus on connecting people with nature and animals.",
    category: "milestone" as const,
  },
  {
    id: "2",
    year: 2008,
    title: "Animal Sanctuary",
    description: "Started rescuing horses and dogs, establishing the foundation for our animal welfare programs.",
    category: "expansion" as const,
  },
  {
    id: "3",
    year: 2010,
    title: "Educational Programs Launch",
    description: "Began partnerships with international schools in Cairo, offering structured educational visits and programs.",
    category: "milestone" as const,
  },
  {
    id: "4",
    year: 2015,
    title: "Rural Wellness Initiative",
    description: "Launched the Rural Wellness Initiative to provide support and education to the local farming community.",
    category: "community" as const,
  },
  {
    id: "5",
    year: 2020,
    title: "Sustainable Farming Expansion",
    description: "Expanded organic farming operations and initiated new experimental plantation projects.",
    category: "expansion" as const,
  },
];

export default function FarmStory() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            Our Journey Through Time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Since 2005, Al Sorat Farm has been a sanctuary for learning, growth, and connection with nature.
            Explore our history and the milestones that have shaped our community.
          </motion.p>
        </div>

        <Timeline events={timelineEvents} />

        <div className="mt-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-600 italic"
          >
            "Our story continues to grow with each visitor, each animal we care for, and each seed we plant."
          </motion.p>
        </div>
      </div>
    </div>
  );
}
