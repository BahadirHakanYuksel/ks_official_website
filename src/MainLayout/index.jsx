import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { updateLngHandle } from "../utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";
import { useSelector } from "react-redux";
import ResponsiveNavMenu from "../components/ResponsiveNavMenu";
import { AnimatePresence } from "framer-motion";
import { useResponsiveData } from "../Context";
import classNames from "classnames";

function MainLayout() {
  const { t, i18n } = useTranslation();

  const { responsiveNavMenuIsActive } = useSelector((state) => state.app);

  const { isMobile } = useResponsiveData();

  useEffect(() => {
    updateLngHandle(i18n.language);
  }, []);

  return (
    <div className="flex flex-col">
      <TopNavbar />
      <Navbar />
      <Outlet />
      <Footer />
      <div
        className={classNames(
          "bg-preKsBoxBack text-titleColor text-[14px] font-medium h-14 flex gap-1.5 justify-center items-center",
          {
            "!flex-col !h-auto !py-2.5 !text-xs": isMobile,
          }
        )}
      >
        <header className="text-titleColor">{t("productionWorkers")}</header>
        <div
          className={classNames("h-9 w-0.5 rounded-full bg-ksGrayTp", {
            "!w-16 !h-0.5": isMobile,
          })}
        ></div>

        <a
          className="flex items-center text-myText justify-center px-2.5 h-9 hover:bg-ksGreen duration-200 rounded-sm hover:text-white"
          href="https://www.linkedin.com/in/bahad%C4%B1r-hakan-y%C3%BCksel-38457426a/"
          target="_blank"
        >
          Bahadır Hakan Yüksel - Software & Design
        </a>
        <div
          className={classNames("h-4 w-0.5 rounded-full bg-ksGrayTp", {
            "!w-4 !h-0.5": isMobile,
          })}
        ></div>
        <div className="flex items-center text-myText justify-center px-2.5 h-9 hover:bg-ksGreen duration-200 rounded-sm hover:text-white pointer-events-none">
          Barış Kılıç - Software & Design
        </div>
      </div>
      <AnimatePresence>
        {responsiveNavMenuIsActive && isMobile && <ResponsiveNavMenu />}
      </AnimatePresence>
    </div>
  );
}

export default MainLayout;
