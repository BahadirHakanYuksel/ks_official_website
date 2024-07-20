import { motion } from "framer-motion";
import HomeTitle from "../../components/HomeTitle";
import IntroductionOfKs from "../WhatIsTheKs/IntroductionOfKs";
import AgendaHome from "./AgendaHome";
import InsuranceServices from "./InsuranceServices";
import PresentationSlider from "./PresentationSlider";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page flex flex-col gap-24"
    >
      <PresentationSlider />
      <div className="flex flex-col gap-5">
        <HomeTitle>Katılım Sigortası Nedir ?</HomeTitle>
        <IntroductionOfKs />
      </div>
      <InsuranceServices />
      <AgendaHome />
    </motion.div>
  );
}

export default Home;
