import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage";
import ThemeButton from "../../../components/ThemeButton";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import classNames from "classnames";

function AdminLayout() {
  const { ksAdmin } = useSelector((state) => state.admin);
  const { t } = useTranslation();
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const [activeNavMenuButtonId, setActiveNavMenuButtonId] = useState(0);

  const adminMenuData = [
    {
      dbUrlKey: false,
      url: "/admin",
      title: "Anasayfa",
      id: 0,
    },
    {
      dbUrlKey: "news",
      url: "/admin/news",
      title: t("agenda"),
      id: 1,
    },
    {
      dbUrlKey: "accountInfos",
      url: "/admin/account-settings",
      title: "Hesap Ayarları",
      id: 2,
    },
  ];

  useEffect(() => {
    adminMenuData.forEach((menuBtn) => {
      menuBtn.url === path && setActiveNavMenuButtonId(menuBtn.id);
      if (
        path.split("/")[2] === "news" ||
        path.split("/")[2] === "articles" ||
        path.split("/")[2] === "announcements"
      )
        setActiveNavMenuButtonId(1);
    });
  }, [path]);

  return (
    <div>
      {ksAdmin ? (
        <div className="flex flex-col w-full min-h-screen bg-backColor px-10">
          <nav className="flex items-center justify-between h-14 bg-backColor sticky top-0 w-full left-0">
            <button
              onClick={() => navigate("/admin")}
              className="text-3xl font-medium text-ksGreen active:scale-105 duration-200"
            >
              Katılım Sigortası Admin Paneli
            </button>
            <div className="flex gap-2.5">
              {adminMenuData.map((btn) => (
                <button
                  onClick={() => navigate(btn.url)}
                  key={btn.id}
                  className={classNames(
                    "text-base font-medium text-myText bg-serviceMenuBtnBack shadow-md px-2 flex items-center justify-center rounded-sm h-8 duration-200",
                    {
                      "!text-ksGreen": btn.id === activeNavMenuButtonId,
                    }
                  )}
                >
                  {btn.title}
                </button>
              ))}
              <ThemeButton />
            </div>
          </nav>
          <Outlet />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default AdminLayout;
