import React from "react";
import HeroSection from "../components/Journey/HeroSection";
import JourneySteps from "../components/Journey/JourneySteps";

type Props = {};

export default function UserJourne({}: Props) {
  return (
    <div>
      <HeroSection />
      <JourneySteps />
    </div>
  );
}
