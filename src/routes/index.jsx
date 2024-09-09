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
import AdminLayout from "../pages/Admin/AdminLayout";
import AdminSettings from "../pages/Admin/AdminSettings";
import AdminAgenda from "../pages/Admin/AdminAgenda";

export const useDynamicRoutes = () => {
  const { i18n } = useTranslation();
  const adminUrl = import.meta.env.VITE_ADMIN_URL;
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
          path: "about-us",
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
      path: "/admin-" + adminUrl,
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Admin />,
        },
        {
          path: "account-settings",
          element: <AdminSettings />,
        },
        {
          path: ":pathAdminCategory",
          element: <AdminAgenda />,
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
