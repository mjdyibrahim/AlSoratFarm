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
              <h2 className="text-2xl font-semibold mb-4">
                Animal Interaction
              </h2>
              <p className="text-gray-600">
                It's well known in scientific circles that simply petting dogs
                and cats can lower someone's blood pressure. The same is true of
                horses, mules, and donkeys, and they are used in therapeutic
                settings in many hospitals, including here in Egypt. Our animals
                are here at the farm for years and they know that they live
                here, so they are comfortable and secure. The dogs in particular
                are at the farm from puppyhood for the most part and learn from
                the others in the pack how to put people at ease when newcomers
                arrive. They have become very skilled at dealing with refugees
                lately, as many groups have been visiting. All of them are
                vaccinated.
              </p>
            </CardContent>
          </Card>

          <Card id="education">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Educational Programs
              </h2>
              <p className="text-gray-600">
                We have been working with many of the major international
                schools in Cairo for years, planning outings for children from
                nursery schools to secondary schools as well as for
                universities. With 3.5 feddan of land in gardens, paddocks,
                buildings and such we have opportunities for almost every
                possible variety of lesson. One of our standards is a
                demonstration of cheese-making starting with fresh buffalo milk.
                In the course of the demonstration we discuss the history of
                cheese-making, the wide variety of animals that produce milk,
                the normal temperatures of mammals, the necessary temperatures
                to pasteurize milk and how UHT milk is created along with why it
                can not be used for cheese-making. Learning, when it is offered
                in a living environment, is more readily remembered and
                understood that when it is dry facts on a board.
              </p>
            </CardContent>
          </Card>

          <Card id="farming">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Organic Farming</h2>
              <p className="text-gray-600">
                Having our own wells producing fresh clean water and the organic
                fertilizer that is produced by the animals at the farm, organic
                gardening is inevitable. We also have bathtubs for Vermiculture
                (the growing of earthworms for the revitalization of the soil in
                gardens and pots). We can offer starter kits for people who want
                to experiment with pot gardening on balconies or roof tops. We
                are beginning some projects for community gardens based in our
                gardens for people who want to grow things but who have no place
                at all to do so. In the 20 years during which the farm has been
                in existence we have been noticing and monitoring the changes in
                the climate and we have been trying out some interesting
                vegetables that are more comfortable in a warming climate.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
