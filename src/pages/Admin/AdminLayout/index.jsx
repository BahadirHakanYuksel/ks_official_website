import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage";
import ThemeButton from "../../../components/ThemeButton";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import classNames from "classnames";
import LanguageButtons from "../../../components/LanguageButtons";
import { AnimatePresence, motion } from "framer-motion";
import { openModalBoxHandle, updateKsAdminHandle } from "../../../utils";
import ModalBox from "../../../components/ModalBox";

function AdminLayout() {
  const { ksAdmin } = useSelector((state) => state.admin);
  const { t } = useTranslation();
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { modalInfos } = useSelector((state) => state.modal);
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

  const loadingAgainOperations = async () => {
    if (localStorage.getItem("ks_user") !== null) {
      const localUserId = localStorage.getItem("ks_user");
      const formData = new FormData();
      formData.append("action", "auth");
      try {
        await fetch("https://katilimsigortacisi.com/php-admin/", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            data.forEach((user) => {
              console.log(user);

              if (user.id === localUserId) {
                updateKsAdminHandle(user);
              }
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    loadingAgainOperations();
  }, []);

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
      <AnimatePresence>
        {ksAdmin ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col w-full min-h-screen bg-backColor px-10 relative"
          >
            <nav className="flex z-10 items-center justify-between h-14 bg-backColor sticky top-0 w-full left-0">
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
                <button
                  onClick={() =>
                    openModalBoxHandle({
                      operation: "logOut",
                      myData: false,
                    })
                  }
                  className="text-base font-medium text-myText bg-serviceMenuBtnBack shadow-md px-2 flex items-center justify-center rounded-sm h-8 duration-200 hover:bg-red-700 hover:text-white"
                >
                  Çıkış Yap
                </button>
                <LanguageButtons />
                <ThemeButton />
              </div>
            </nav>
            <AnimatePresence>{modalInfos && <ModalBox />}</AnimatePresence>

            <Outlet />
          </motion.div>
        ) : (
          <LoginPage />
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminLayout;
