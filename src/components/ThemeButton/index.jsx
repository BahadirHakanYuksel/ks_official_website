import { useSelector } from "react-redux";
import { updateThemeHandle } from "../../utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

function ThemeButton({ responsiveMode = false }) {
  const { act_theme } = useSelector((state) => state.theme);

  const { t } = useTranslation();
  const [themeIcon, setthemeIcon] = useState(undefined);
  const { isTablet, isMobile } = useResponsiveData();

  const changeTheme = () => {
    switch (act_theme) {
      case "light":
        updateThemeHandle("dark");
        document.documentElement.setAttribute("data-theme", "dark");
        setthemeIcon("fa-sun");
        break;
      case "dark":
        updateThemeHandle("light");
        document.documentElement.setAttribute("data-theme", "light");
        setthemeIcon("fa-moon");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("ks_theme")) {
      if (localStorage.getItem("ks_theme") === "light") setthemeIcon("fa-moon");
      else setthemeIcon("fa-sun");
    } else setthemeIcon("fa-sun");
    document.documentElement.setAttribute("data-theme", act_theme);
  }, []);
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      title={act_theme === "dark" ? t("lightMode") : t("darkMode")}
      onClick={changeTheme}
      className={classNames(
        "flex items-center justify-center text-myText bg-ksGrayTp w-7 h-7 text-base rounded-md hover:bg-ksGray hover:text-white duration-200 border-2 border-solid border-ksGrayTp",
        {
          "!w-6 !h-6 !text-[13px]": isTablet && !responsiveMode,
        },
        {
          "!w-full !h-10 !gap-1 !text-xs": responsiveMode && isMobile,
        }
      )}
    >
      <i className={`fa-solid ${themeIcon}`}></i>
      {responsiveMode && (
        <span className="font-medium">
          {act_theme === "dark" ? t("lightMode") : t("darkMode")}
        </span>
      )}
    </motion.button>
  );
}

export default ThemeButton;
