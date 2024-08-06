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

function MainLayout() {
  const { i18n } = useTranslation();

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
      <AnimatePresence>
        {responsiveNavMenuIsActive && isMobile && <ResponsiveNavMenu />}
      </AnimatePresence>
    </div>
  );
}

export default MainLayout;
