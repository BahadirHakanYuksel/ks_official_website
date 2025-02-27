import { motion } from "framer-motion";
import HomeTitle from "../../components/HomeTitle";
import IntroductionOfKs from "../WhatIsTheKs/IntroductionOfKs";
import AgendaHome from "./AgendaHome";
import InsuranceServices from "./InsuranceServices";
import PresentationSlider from "./PresentationSlider";
import ContactHome from "./ContactHome";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Team from "../Team";

function Home() {
  const { t } = useTranslation();

  // Örnek: Tüm todoları listeleme
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://katilimsigortacisi.com:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "list",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // fetchTodos();

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
