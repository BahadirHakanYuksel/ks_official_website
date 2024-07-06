import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { updateLngHandle } from "../utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";
import { useSelector } from "react-redux";

function MainLayout() {
  const { i18n } = useTranslation();

  useEffect(() => {
    updateLngHandle(i18n.language);
  }, []);

  return (
    <div className="flex flex-col">
      <TopNavbar />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
