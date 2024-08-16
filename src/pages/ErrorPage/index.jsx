import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page h-[600px] w-full flex items-center justify-center bg-preKsBoxBack border-2 border-solid border-ksGrayTp flex-col gap-5"
    >
      <Helmet>
        <title>{t("pageNotFound")}</title>
      </Helmet>
      <header className="text-5xl font-medium">{t("pageNotFound")} :/</header>
      <NavLink
        to={"/"}
        className="flex items-center justify-center text-lg font-medium h-14 px-5 rounded-full bg-ksGray text-white hover:bg-ksGreen duration-200"
      >
        {t("goToHomepage")}
      </NavLink>
    </motion.div>
  );
}

export default ErrorPage;
