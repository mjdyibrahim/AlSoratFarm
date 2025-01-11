import { Switch, Route } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Farm from "@/pages/Farm";
import Contact from "@/pages/Contact";
import Events from "@/pages/Events";
import InteractiveMap from "@/pages/InteractiveMap";
import DayuseBooking from "@/pages/DayuseBooking";
import FarmStory from "@/pages/FarmStory";
import Animals from "@/pages/Animals";
import VirtualTour from "@/pages/VirtualTour";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/farm" component={Farm} />
          <Route path="/contact" component={Contact} />
          <Route path="/events" component={Events} />
          <Route path="/map" component={InteractiveMap} />
          <Route path="/book-dayuse" component={DayuseBooking} />
          <Route path="/story" component={FarmStory} />
          <Route path="/animals" component={Animals} />
          <Route path="/virtual-tour" component={VirtualTour} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;