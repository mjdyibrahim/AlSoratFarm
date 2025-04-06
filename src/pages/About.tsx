import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">About Al Sorat Farm</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  Al Sorat Farm is an educational and recreational center that welcomes students from schools around the world
                  to visit our rescued horses and dogs. We provide a unique space where people can connect with nature and
                  animals while learning about sustainable farming practices.
                </p>
                <p className="text-gray-600">
                  We breed goats and sheep to help improve the blood stock for local farmers, practice organic farming,
                  offer horseback riding lessons and trail riding, and provide lessons in local cooking and cheese making.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Community Impact</h2>
                <p className="text-gray-600 mb-6">
                  We work extensively with charitable organizations, particularly those that benefit underprivileged
                  children. The schools that visit the farm are private schools in the larger Cairo/Giza area, coming for
                  both day visits and week-long integrated programs.
                </p>
                <p className="text-gray-600">
                  Through the Rural Wellness Initiative, we offer first aid, education, and animal maintenance procedures
                  such as parasite control to the local farming community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
              <p className="text-gray-600 mb-6">
                There simply is no other place like Al Sorat Farm in Egypt. From our focus on natural living quarters for
                the animals to our interest in nutrition and the use of edible garden plants in cooking, we provide a
                unique educational experience.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Natural and sustainable farming practices</li>
                <li>Hands-on educational experiences</li>
                <li>Animal welfare and rehabilitation</li>
                <li>Community engagement and support</li>
                <li>Traditional cooking and food preparation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
