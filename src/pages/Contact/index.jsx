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
      <div className="">
        <div
          className={classNames(
            "w-full h-[562px] grid grid-cols-2 overflow-hidden rounded-lg shadow-lg px-[100px]",
            {
              "!h-[500px] !px-[20px]": isLaptop,
            },
            {
              "!grid-cols-1 !gap-24 !h-auto !px-[10px] !shadow-none": isTablet,
            },
            {
              "!w-[100%]": isMobile,
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
