import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const adminUrl = import.meta.env.VITE_ADMIN_URL;

  const fastMenuData = [
    {
      url: `/admin-${adminUrl}/news`,
      title: t("news"),
      id: 0,
    },
    {
      url: `/admin-${adminUrl}/articles`,
      title: t("articles"),
      id: 1,
    },
    {
      url: `/admin-${adminUrl}/announcements`,
      title: t("announcements"),
      id: 2,
    },
    {
      url: `/admin-${adminUrl}/admin-team`,
      title: t("team"),
      id: 3,
    },
    {
      url: `/admin-${adminUrl}/account-settings`,
      title: t("accountSettings"),
      id: 4,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      <div
        className={classNames(
          "adminWelcomeText w-full h-[400px] bg-gradient-to-t to-ksGreen from-ksGray text-white text-5xl font-medium flex items-center justify-center shadow-lg relative rounded-t-md"
        )}
      >
        <div className="absolute left-2.5 top-2.5 text-sm text-backColor">
          {t("fastMenu")}
        </div>
        <header className="mb-5">{t("adminWelcomeMessage")}</header>
        <div
          className={classNames(
            "fastMenu flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2 -bottom-12 "
          )}
        >
          {fastMenuData.map((menu) => (
            <button
              onClick={() => navigate(menu.url)}
              key={menu.id}
              className={classNames(
                "fastMenuBox h-40 w-40 flex items-center justify-center border-0 border-solid border-ksGrayTp text-xl rounded-lg font-medium text-myText shadow-lg hover:text-ksGreen duration-200 bg-preKsBoxBack"
              )}
            >
              {menu.title}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[150px] bg-gradient-to-t to-ksGray from-ksGreen rounded-b-md adminBackground2"></div>
      <div className="text-titleColor font-medium text-sm flex items-center justify-center h-10">
        2024-{t("piap")}
      </div>
    </motion.div>
  );
}

export default Admin;
