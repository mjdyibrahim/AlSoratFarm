import { Timeline } from "@/components/Timeline";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    id: "1",
    year: 2000,
    title: "The Beginning",
    description: "Maryanne Stroud Gabbani lost her husband in an accident just as her children were graduating from Cairo American College. They traveled to New York to attend university together, while she remained in Cairo to sort out issues with her late husband’s businesses.",
    category: "milestone" as const,
  },
  {
    id: "2",
    year: 2004,
    title: "Securing the land",
    description: "Maryanne purchased 3 feddan (roughly 3 acres) of agricultural land in and area of Giza known as Ezbyt el Khawagat which translates as the farm of the foreigners because many years previously there had been farms own by some foreign families. The land had been used for growing peppers and corn and was empty. She began building, starting with a small basic house and paddocks for her horses, because she was beginning to do equestrian tourism. The rides started and ended at the farm, with half of the ride in the farming area and half in the desert so that riders had a chance to see both aspects of Egypt. Changes have been occurring throughout the years gradually, but the farm has remained a rural retreat where families and schools can remember what life is like without asphalt.",
    category: "milestone" as const,
  },
  {
    id: "3",
    year: 2006,
    title: "Animal Sanctuary",
    description:"The animal population at Al Sorat Farm has remained fairly steady through out the years. Before she moved to the farm from Maadi, Maryanne had been breeding American Rat Terriers through a kennel registered in the US, RatBusters for the purpose of providing a humane and effective means of rat control for her late husband’s factories and warehouses. The rats were less a danger to the grains in the warehouses than they were a danger to the copper cables that were needed by the computer systems, and the dogs were an excellent deterrent. However, when her husband died, a family member who hated dogs took over the management and shipped all the dogs back to her in Maadi, so she moved to the farm with about 14 dogs, most of whom were rather small but fierce rodent hunters. Between her husband’s death in 2000 and moving to the farm in 2004, she had rented a 1.5 feddan plot of land so that her horses could relax and move around freely. She had 5 horses (Two mares and their two sons, as well as a gelding) when she moved the horse into the land in 2002, and when she moved her horses to the paddock at the farm there were roughly eighteen horses, mares and geldings, moved over. All of these horses had been given to her by friends who had asked her to take their horses for free because they wanted them to have a better life than might be expected if the horses had been sold to stables near the Sphinx in Giza. As she was spending more and more time working on her equine tourism, having more horses meant that she did not have to work tired or injured horses. They could take the time off to rest and heal, meaning that her horses lasted longer with her. In fact a few are with her to this day. She realized that it was better for the horses to be living out of doors all the time with free access to fresh water and hay rather than the stable routine of boxes keeping the horses confined, which can be much easier for human keepers than having them roaming free. As years passed when there was a gap in the equine population, another horse would appear to take the place of the lost one some how or other, and the same thing happened with the dogs who would adopt a new dog when the population dropped. Rat Terriers are very long-lived dogs, but eventually they all did pass and were gradually replaced by various baladi dogs to keep the population at about fourteen or fifteen. There has generally been one or two Great Danes in the pack and the dogs roam the farm freely, sleeping in one of the two houses on the property, similar to the horses who have lived in two large paddocks while having a couple of smaller paddocks available for isolation at times. But the freedom to roam the property and interact with similar and different species has always been the hallmark of the animal life on the farm.",
    category: "milestone" as const,
  },
  {
    id: "4",
    year: 2009,
    title: "Educational Programs",
    description: "Having been a teacher, many of Maryanne’s friends were also in education and when they visited the farm they saw the possibilities in it as a venue for school trips. This activity has continued to the present with breaks during Covid and such.",
    category: "milestone" as const,
  },
  {
    id: "5",
    year: 2012,
    title: "Rural Wellness Initiative",
    description: "Rural Wellness Initiative Egypt is a community initiative to assist the farmers living in the area of Al Sorat Farm. Riding horses around the farms made it clear that the farmers were having problems procuring veterinary medications that could help them with their farm animals. Many maintenance medications such as wormers were either available in much too large or much too small packages for the small farmers who did not have any transport other than their donkeys, and who also did not have enough money to buy in bulk. Working with a number of vets in the area, Maryanne realized that it would be possible to provide the basic wellness medications to the farmers for free. As time has gone by, inflation has made it harder and harder to provide medications for free, and we are now more than happy to accept donations either in kind or in cash for the purchasing of medications. RWI Egypt began working in 2012 and has been helping farm families ever since with weekly visits to three village areas around the farm and with a vet who is available from Sunday to Thursday.",
    category: "milestone" as const,
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
            Since 2000, Al Sorat Farm has been a sanctuary for learning, growth, and connection with nature.
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
