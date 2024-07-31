import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
import MessageBox from "../../components/MessageBox";
import ContactBox from "../../components/ContactBox";
function Contact() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5"
    >
      <PageTitle>{t("contact")}</PageTitle>
      <div className="page">
        <div className=" w-full h-[562px] grid grid-cols-2 overflow-hidden rounded-lg shadow-lg">
          <MessageBox />
          <ContactBox />
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
