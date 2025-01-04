import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Photo {
  url: string;
  alt: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo, index) => (
        <div key={index} className="overflow-hidden rounded-lg">
          <AspectRatio ratio={4/3}>
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}
