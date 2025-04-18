import { useTranslation } from "react-i18next";
import HomeTitle from "../../components/HomeTitle";
import IntroductionOfKs from "./IntroductionOfKs";
import PageTitle from "../../components/PageTitle";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function WhatIsTheKs() {
  const { t } = useTranslation();

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" flex flex-col gap-5"
    >
      <Helmet>
        <title>{t("what-is-the-ks")} ?</title>
      </Helmet>
      <PageTitle>{t("what-is-the-ks")} ?</PageTitle>
      <div className="page">
        <IntroductionOfKs />
      </div>
    </motion.div>
  );
}

export default WhatIsTheKs;
