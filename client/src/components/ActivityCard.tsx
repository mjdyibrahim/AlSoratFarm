import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface ActivityCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export function ActivityCard({ title, description, imageUrl, link }: ActivityCardProps) {
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href={link}>Learn More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
