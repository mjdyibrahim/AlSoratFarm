import { Phone, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Al Sorat Farm</h3>
            <p className="text-sm">
              Educational and recreational center welcoming students and families to connect with nature and animals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a href="tel:+201222118386" className="flex items-center gap-2 text-sm hover:underline">
                <Phone className="h-4 w-4" />
                +20 (122) 211-8386
              </a>
              <a
                href="https://www.facebook.com/ruralwellnessinitiativeegypt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:underline"
              >
                <Facebook className="h-4 w-4" />
                Follow us on Facebook
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <p className="text-sm">
              Available anytime via Phone, Facebook Message, WhatsApp, and Text
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Al Sorat Farm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
