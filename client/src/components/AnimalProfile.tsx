import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Dog, Heart, Info } from "lucide-react";

interface FunFact {
  id: string;
  fact: string;
}

interface AnimalProfile {
  id: string;
  name: string;
  species: string;
  description: string;
  imageUrl: string;
  funFacts: FunFact[];
  traits: string[];
}

interface AnimalProfileProps {
  profile: AnimalProfile;
}

export function AnimalProfile({ profile }: AnimalProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <div 
          className="h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${profile.imageUrl})` }}
        />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Dog className="h-5 w-5 text-primary" />
              {profile.name}
            </CardTitle>
            <Badge variant="outline">{profile.species}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{profile.description}</p>

          <div className="flex flex-wrap gap-2">
            {profile.traits.map((trait, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {trait}
              </Badge>
            ))}
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="fun-facts">
              <AccordionTrigger className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Fun Facts
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {profile.funFacts.map((fact) => (
                    <motion.li
                      key={fact.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-primary">•</span>
                      {fact.fact}
                    </motion.li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}