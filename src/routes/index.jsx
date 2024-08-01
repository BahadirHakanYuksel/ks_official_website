import MainLayout from "../MainLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Admin from "../pages/Admin";
import ErrorPage from "../pages/ErrorPage";
import { useTranslation } from "react-i18next";
import WhatIsTheKs from "../pages/WhatIsTheKs";
import InsuranceServicePage from "../pages/InsuranceServicePage";
import AgendaLayout from "../AgendaLayout";
import Agenda from "../pages/Agenda";
import AgendaContent from "../pages/AgendaContent";

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
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "what-is-participation-insurance",
          element: <WhatIsTheKs />,
        },
        {
          path: `agenda/:pathAgendaCategory`,
          element: <Agenda />,
        },
        {
          path: "agenda/:pathAgendaCategory/:pathAgendaInfo",
          element: <AgendaContent />,
        },
        {
          path: "admin",
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
