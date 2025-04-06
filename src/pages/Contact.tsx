import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+201222118386"
                        className="text-gray-600 hover:text-primary"
                      >
                        +20 (122) 211-8386
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Facebook className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <a
                        href="https://www.facebook.com/AlSoratFarm/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary"
                      >
                        Al Sorat Farm
                      </a>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h3 className="font-medium mb-2">Hours of Operation</h3>
                    <p className="text-gray-600">9:30 am to Sunset every day</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Send us a Message
                </h2>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
