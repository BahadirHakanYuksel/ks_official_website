import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import classNames from "classnames";
import { closeResNavMenuHandle } from "../../utils";

function ResponsiveNavMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navMenu = [
    {
      url: "/",
      title: t("home"),
      id: 0,
    },
    {
      url: "/about",
      title: t("about-us"),
      id: 1,
    },
    {
      url: "/what-is-participation-insurance",
      title: t("what-is-the-ks"),
      id: 2,
    },
    {
      url: "/contact",
      title: t("contact"),
      id: 3,
    },
    {
      url: "/agenda/news",
      title: t("news"),
      id: 4,
    },
    {
      url: "/agenda/articles",
      title: t("articles"),
      id: 5,
    },
    {
      url: "/agenda/announcements",
      title: t("announcements"),
      id: 6,
    },
  ];

  return (
    <motion.div
      initial={{ right: "-600px", opacity: 0 }}
      animate={{ right: 0, opacity: 1 }}
      exit={{ right: "-600px", opacity: 0 }}
      className="fixed responsiveNavMenu right-0 bottom-0 flex flex-col bg-responsiveNavMenuBack pt-12 w-full px-[10px] overflow-hidden text-sm"
    >
      <header className="text-3xl border-b-2 border-solid border-b-ksGrayTp font-medium text-titleColor text-end mb-2.5 text-nowrap">
        Menu
      </header>
      <div className="flex flex-col gap-3.5">
        {navMenu.map((btn) => (
          <button
            onClick={() => {
              navigate(btn.url);
              closeResNavMenuHandle();
            }}
            key={btn.id}
            className={classNames(
              "flex justify-end w-full items-center text-4xl active::bg-preKsBoxIcon rounded-md active::text-white text-end",
              {
                "mt-5": btn.id === 4,
              },
              {
                "mb-2.5": btn.id === 6,
              }
            )}
          >
            {btn.title}
          </button>
        ))}
        <ThemeButton responsiveMode={true} />
      </div>
    </motion.div>
  );
}

export default ResponsiveNavMenu;
