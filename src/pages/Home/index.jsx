import { motion } from "framer-motion";
import HomeTitle from "../../components/HomeTitle";
import IntroductionOfKs from "../WhatIsTheKs/IntroductionOfKs";
import AgendaHome from "./AgendaHome";
import InsuranceServices from "./InsuranceServices";
import PresentationSlider from "./PresentationSlider";
import ContactHome from "./ContactHome";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";

function Home() {
  const { t } = useTranslation();

  const { isMobile } = useResponsiveData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page flex flex-col gap-24"
    >
      <PresentationSlider />
      <div className={classNames("flex flex-col gap-5", {})}>
        <HomeTitle>{t("what-is-the-ks")} ?</HomeTitle>
        <IntroductionOfKs />
      </div>
      <InsuranceServices />
      <AgendaHome />
      <ContactHome />
    </motion.div>
  );
}

export default Home;
