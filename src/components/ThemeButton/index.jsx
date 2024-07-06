import { useSelector } from "react-redux";
import { updateThemeHandle } from "../../utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ThemeButton() {
  const { act_theme } = useSelector((state) => state.theme);

  const [themeIcon, setthemeIcon] = useState("fa-moon");

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
    document.documentElement.setAttribute("data-theme", act_theme);
  }, []);
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      title={act_theme === "dark" ? "Light Mode" : "Dark Mode"}
      onClick={changeTheme}
      className="flex items-center justify-center text-myText bg-ksGrayTp w-7 h-7 text-base rounded-md hover:bg-ksGray hover:text-white duration-200"
    >
      <i className={`fa-solid ${themeIcon}`}></i>
    </motion.button>
  );
}

export default ThemeButton;
