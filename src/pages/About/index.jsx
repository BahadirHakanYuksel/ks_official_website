import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
function About() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page flex flex-col gap-5"
    >
      <PageTitle>{t("about-us")}</PageTitle>
    </motion.div>
  );
}

export default About;
