import MainLayout from "../MainLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Admin from "../pages/Admin";
import ErrorPage from "../pages/ErrorPage";
import { useTranslation } from "react-i18next";
import WhatIsTheKs from "../pages/WhatIsTheKs";
import InsuranceServicePage from "../pages/InsuranceServicePage";

export const useDynamicRoutes = () => {
  const { i18n } = useTranslation();

  return [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: i18n.language === "en" ? "about" : "hakkimizda",
          element: <About />,
        },
        {
          path: i18n.language === "en" ? "contact" : "iletisim",
          element: <Contact />,
        },
        {
          path:
            i18n.language === "en"
              ? "what-is-participation-insurance"
              : "katilim-sigortasi-nedir",
          element: <WhatIsTheKs />,
        },
        {
          path: i18n.language === "en" ? "admin" : "yonetici-paneli",
          element: <Admin />,
        },
        {
          path: ":pathServiceCategory/:pathServiceName",
          element: <InsuranceServicePage />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];
};
