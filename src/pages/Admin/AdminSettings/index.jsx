import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import PasswordUpdate from "./PasswordUpdate";
import ContactInfosUpdate from "./ContactInfosUpdate";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import PresentationUpdate from "./PresentationUpdate";
import { useResponsiveData } from "../../../Context";

function AdminSettings() {
  const { t } = useTranslation();
  const { isMobile } = useResponsiveData();
  const [activeApp, setActiveApp] = useState(0);
  const appList = ["İletişim Bilgileri", "Reklam Panosu", "Şifre Güncelleme"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5"
    >
      <PageTitle>{t("accountSettings")}</PageTitle>
      <div className="grid grid-cols-3 items-center -mt-5">
        {appList.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveApp(index)}
            className={classNames(
              "text-myText pointer-events-auto border-b-4 border-solid border-ksGrayTp flex items-center justify-center h-12 px-3.5 hover:border-b-green-700 opacity-70 hover:opacity-90 duration-200 text-lg",
              {
                "!text-myText !opacity-100 !pointer-events-none !border-ksGreen":
                  index === activeApp,
              },
              {
                "!text-sm": isMobile,
              }
            )}
          >
            {item}
          </button>
        ))}
      </div>
      {activeApp === 0 && <ContactInfosUpdate />}
      {activeApp === 1 && <PresentationUpdate />}
      {activeApp === 2 && <PasswordUpdate />}
    </motion.div>
  );
}

export default AdminSettings;

export const SettingsHeader = ({ children }) => {
  return (
    <div className="flex items-center">
      <header className="text-titleColor bg-serviceMenuBack px-5 h-11 flex items-center justify-center font-medium text-xl border-b-2 border-solid border-ksGreen mb-2.5">
        {children}
      </header>
    </div>
  );
};
