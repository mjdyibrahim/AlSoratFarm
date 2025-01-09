import { AnimalProfile } from "@/components/AnimalProfile";

const animalProfiles = [
  {
    id: "goats",
    name: "Farm Goats",
    species: "Goat",
    description: "Our friendly goats are some of the cutest creatures on the planet. We always have baby goats around for visitors to play with and cuddle.",
    imageUrl: "https://images.unsplash.com/photo-1533318087102-b3ad366ed041",
    traits: ["Playful", "Social", "Friendly", "Great with kids"],
    funFacts: [
      {
        id: "g1",
        fact: "Goats can help improve local bloodstock through our breeding program"
      },
      {
        id: "g2",
        fact: "Baby goats, called kids, are known for their playful jumping behavior called 'capering'"
      },
      {
        id: "g3",
        fact: "Petting goats can help lower blood pressure and reduce stress"
      }
    ]
  },
  {
    id: "horses",
    name: "Farm Horses",
    species: "Horse",
    description: "Our well-trained horses are perfect for both riding lessons and trail adventures. All are well-fed and cared for with proper equipment.",
    imageUrl: "https://images.unsplash.com/photo-1723581209173-48e0de88a83d",
    traits: ["Well-trained", "Gentle", "Trail-ready", "Family-friendly"],
    funFacts: [
      {
        id: "h1",
        fact: "We offer supervised riding and training tips for all skill levels"
      },
      {
        id: "h2",
        fact: "Our horses are specially chosen for their calm temperament"
      },
      {
        id: "h3",
        fact: "Each horse has its own unique personality and preferred treats"
      }
    ]
  },
  {
    id: "dogs",
    name: "Farm Dogs",
    species: "Dog",
    description: "Our pack of about 14 dogs ranges from small terriers to Great Danes, all chosen for their friendly nature.",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    traits: ["Diverse breeds", "Friendly", "Well-socialized", "Family-oriented"],
    funFacts: [
      {
        id: "d1",
        fact: "Our dogs are part of the farm's rescue program"
      },
      {
        id: "d2",
        fact: "Each dog has a special role in farm life"
      },
      {
        id: "d3",
        fact: "Regular interaction with visitors helps keep them social and happy"
      }
    ]
  },
  {
    id: "donkeys",
    name: "Farm Donkeys",
    species: "Donkey",
    description: "Our donkeys provide both companionship and help with farm work. They're gentle souls with big personalities.",
    imageUrl: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3",
    traits: ["Hard-working", "Gentle", "Smart", "Good with visitors"],
    funFacts: [
      {
        id: "dk1",
        fact: "Donkeys are incredibly intelligent and have excellent memory"
      },
      {
        id: "dk2",
        fact: "They help with traditional farming methods in the local area"
      },
      {
        id: "dk3",
        fact: "Our donkeys participate in cart rides for visitors"
      }
    ]
  }
];

export default function Animals() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet Our Animals</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get to know the wonderful animals that call Al Sorat Farm home. Each one has their own unique personality and story to share.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {animalProfiles.map((profile) => (
            <AnimalProfile key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}
