import IntroductionOfKs from "../WhatIsTheKs/IntroductionOfKs";
import AgendaHome from "./AgendaHome";
import InsuranceServices from "./InsuranceServices";
import PresentationSlider from "./PresentationSlider";

function Home() {
  return (
    <div className="page flex flex-col gap-24">
      <PresentationSlider />
      <IntroductionOfKs />
      <InsuranceServices />
      <AgendaHome />
    </div>
  );
}

export default Home;
