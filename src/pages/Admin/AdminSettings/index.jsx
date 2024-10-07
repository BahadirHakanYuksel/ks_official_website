import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import PasswordUpdate from "./PasswordUpdate";
import ContactInfosUpdate from "./ContactInfosUpdate";
import { useState } from "react";
import { motion } from "framer-motion";
import { openModalBoxHandle } from "../../../utils";
import classNames from "classnames";

function AdminSettings() {
  const { t } = useTranslation();

  const [activeApp, setActiveApp] = useState(1);
  const appList = ["Password Update", "Contact Informations"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5"
    >
      <PageTitle>{t("accountSettings")}</PageTitle>
      <div className="flex justify-between items-center -mt-5">
        <div className="flex gap-5 items-center">
          {appList.map((item, index) => (
            <button
              onClick={() => setActiveApp(index)}
              className={classNames(
                "text-myText pointer-events-auto border-2 border-solid border-ksGrayTp rounded-md flex items-center justify-center h-12 px-3.5 hover:border-green-700 opacity-80 hover:opacity-90 bg-contactBoxTitleBack duration-200 text-lg",
                {
                  "!text-myText !opacity-100 !pointer-events-none !border-ksGreen !scale-110":
                    index === activeApp,
                }
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <p className="text-base font-medium text-titleColor">
            {t("accountExit")}
          </p>
          <button
            onClick={() =>
              openModalBoxHandle({
                operation: "logOut",
                myData: false,
              })
            }
            className="flex items-center justify-center rounded-full border-2 border-solid border-red-700 text-myText font-medium hover:bg-red-600 hover:text-white duration-150 bg-preKsBoxBack h-10 px-5"
          >
            {t("logOut")}
          </button>
        </div>
      </div>
      {activeApp === 0 && <PasswordUpdate />}
      {activeApp === 1 && <ContactInfosUpdate />}
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
