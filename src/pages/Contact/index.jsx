import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
import MessageBox from "../../components/MessageBox";
import ContactBox from "../../components/ContactBox";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";
function Contact() {
  const { t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5"
    >
      <PageTitle>{t("contact")}</PageTitle>
      <div className="page">
        <div
          className={classNames(
            "w-full h-[562px] grid grid-cols-2 overflow-hidden rounded-lg shadow-lg",
            {
              "!h-[500px]": isLaptop,
            },
            {
              "!grid-cols-1 !h-auto gap-20 !w-[70%] ml-[50%] -translate-x-1/2":
                isTablet,
            },
            {
              "!grid-cols-1 !h-auto gap-20 !w-[100%]": isMobile,
            }
          )}
        >
          <MessageBox />
          <ContactBox />
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;
