import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: "milestone" | "expansion" | "community";
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20" />

      <div className="space-y-12">
        {sortedEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center ${
              index % 2 === 0 ? "justify-end" : "justify-start"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />

            {/* Content card */}
            <Card className={`w-5/12 ${index % 2 === 0 ? "mr-8" : "ml-8"}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="text-lg">
                    {event.year}
                  </Badge>
                  <Badge variant={
                    event.category === "milestone" ? "default" :
                    event.category === "expansion" ? "secondary" : "outline"
                  }>
                    {event.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
