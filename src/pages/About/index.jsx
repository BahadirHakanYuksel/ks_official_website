import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
function About() {
  const { t } = useTranslation();

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5"
    >
      <Helmet>
        <title>{t("about-us")}</title>
      </Helmet>
      <PageTitle>{t("about-us")}</PageTitle>
      <div className="page">desc</div>
    </motion.div>
  );
}

export default About;
