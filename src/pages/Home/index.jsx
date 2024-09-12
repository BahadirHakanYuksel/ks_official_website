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
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Team from "../Team";

function Home() {
  const { t } = useTranslation();

  const { isMobile } = useResponsiveData();

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page flex flex-col gap-24"
    >
      <Helmet>
        <title>Katılım Sigortası</title>
      </Helmet>
      <PresentationSlider />
      <div className={classNames("flex flex-col gap-5", {})}>
        <HomeTitle>{t("what-is-the-ks")} ?</HomeTitle>
        <IntroductionOfKs />
      </div>
      <InsuranceServices />
      <AgendaHome />
      <ContactHome />
      <Team type="home" />
    </motion.div>
  );
}

export default Home;
