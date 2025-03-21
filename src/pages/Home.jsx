import React from "react";

import HeroSection from "../components/homepage/HeroSection";
import MarketSection from "../components/homepage/MarketSection";
import FeaturesSection from "../components/homepage/FeaturesSection";
import CTASection from "../components/homepage/CTASection";

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <HeroSection />
      <MarketSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}

export default App;
