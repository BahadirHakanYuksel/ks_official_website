import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { aboutUsTextEN, aboutUsTextTR, parseContent } from "../../consts";
function About() {
  const { t, i18n } = useTranslation();

  const [parag, setParag] = useState([]);
  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    i18n.language === "tr"
      ? setParag(aboutUsTextTR.split("\n"))
      : setParag(aboutUsTextEN.split("\n"));
  }, [i18n.language]);

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
      <div className="page flex flex-col gap-5">
        {parag.map((row, i) => (
          <article key={i}>{parseContent(row)}</article>
        ))}
      </div>
    </motion.div>
  );
}

export default About;
