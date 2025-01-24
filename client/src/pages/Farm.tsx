import { PhotoGallery } from "@/components/PhotoGallery";
import { Card, CardContent } from "@/components/ui/card";

const farmPhotos = [
  { url: "images/Dog_Kate.jpeg", alt: "Farm animals" },
  { url: "images/Horses_From_Garden.jpeg", alt: "Horses" },
  { url: "images/Swing_Horses.jpeg", alt: "Educational activities" },
];

export default function Farm() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Our Farm</h1>

        <div className="mb-16">
          <PhotoGallery photos={farmPhotos} />
        </div>

        <div className="space-y-12">
          <Card id="animals">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Animal Interaction</h2>
              <p className="text-gray-600">
                It's well known in scientific circles that simply petting dogs and cats can lower someone's blood pressure.
                It also works with goats, donkeys, horses, mules, and water buffalo and we have them all waiting and ready.
                All of our four-legged friends are picked and trained for their friendliness and kindness, including the
                pack of about 14 dogs that roam the farm.
              </p>
            </CardContent>
          </Card>

          <Card id="education">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Educational Programs</h2>
              <p className="text-gray-600">
                We work with most of the major international schools in Cairo offering class days at the farm where
                children and teachers learn about animal care, from horses to goats to dogs, and have a lot of experience
                in designing lesson plans for class visits. We have given the space and tools for classes in language,
                genetics, mathematics, botany, biology, and just general life science.
              </p>
            </CardContent>
          </Card>

          <Card id="farming">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Organic Farming</h2>
              <p className="text-gray-600">
                With all of the farm animals it isn't surprising that we do organic farming as well. We offer our produce
                in season at more reasonable prices than you will find in a grocery store, and it is picked from the
                garden under your eyes. We are experimenting with new plants all the time, and we are happy to talk to
                other gardeners about what is working and how.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
