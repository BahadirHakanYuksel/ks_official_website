import IntroductionOfKs from "../WhatIsTheKs/IntroductionOfKs";
import PresentationSlider from "./PresentationSlider";

function Home() {
  return (
    <div className="page flex flex-col gap-24">
      <PresentationSlider />
      <IntroductionOfKs />
    </div>
  );
}

export default Home;
