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
import { useResponsiveData } from "../../../Context";

function AdminLayout() {
  const { ksAdmin } = useSelector((state) => state.admin);
  const { i18n, t } = useTranslation();
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { modalInfos } = useSelector((state) => state.modal);
  const [activeNavMenuButtonId, setActiveNavMenuButtonId] = useState(0);
  const adminUrl = import.meta.env.VITE_ADMIN_URL;
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const languages = ["tr", "en"];

  const adminMenuData = [
    {
      dbUrlKey: false,
      url: `/admin-${adminUrl}`,
      title: t("fastMenu"),
      id: 0,
    },
    {
      dbUrlKey: "news",
      url: `/admin-${adminUrl}/news`,
      title: t("agenda"),
      id: 1,
    },
    {
      dbUrlKey: false,
      url: `/admin-${adminUrl}/admin-team`,
      title: t("team"),
      id: 2,
    },
    {
      dbUrlKey: "accountInfos",
      url: `/admin-${adminUrl}/account-settings`,
      title: t("accountSettings"),
      id: 3,
    },
  ];

  const loadingAgainOperations = async () => {
    if (localStorage.getItem("ks_user") !== null) {
      const request_url = import.meta.env.VITE_REQUEST_URL;
      const auth_ks = import.meta.env.VITE_REQUEST_AUTH_KS;
      const localUserId = localStorage.getItem("ks_user");
      const formData = new FormData();
      formData.append("action", auth_ks);
      try {
        await fetch(request_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            data.forEach((user) => {
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
            className={classNames(
              "flex flex-col w-full min-h-screen bg-backColor px-10 relative",
              {
                "px-2.5": isMobile,
              }
            )}
          >
            <nav className="flex z-10 items-center justify-between h-14 bg-backColor sticky top-0 w-full left-0">
              {isMobile && (
                <button
                  onClick={() => navigate(`/admin-${adminUrl}`)}
                  className={classNames(
                    "text-[18px] font-medium text-ksGreen active:scale-105 duration-200"
                  )}
                >
                  KS Admin
                </button>
              )}
              {!isMobile && (
                <button
                  onClick={() => navigate(`/admin-${adminUrl}`)}
                  className={classNames(
                    "adminHeader text-3xl font-medium text-ksGreen active:scale-105 duration-200"
                  )}
                >
                  {t("piap")}
                </button>
              )}
              <div
                className={classNames("flex gap-2", {
                  "!gap-1": isMobile,
                })}
              >
                {!isLaptop &&
                  !isMobile &&
                  !isTablet &&
                  adminMenuData.map((btn) => (
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
                {isLaptop && (
                  <button
                    onClick={() => navigate(adminMenuData[0].url)}
                    className={classNames(
                      "text-base font-medium text-myText bg-serviceMenuBtnBack shadow-md px-2 flex items-center justify-center rounded-sm !h-8 duration-200",
                      {
                        "!text-ksGreen":
                          adminMenuData[0].id === activeNavMenuButtonId,
                      },
                      {
                        "!text-sm": isTablet,
                      },
                      {
                        "!text-xs": isMobile,
                      }
                    )}
                  >
                    {i18n.language === "tr" ? "Hızlı Menü" : "Fast Menu"}
                  </button>
                )}
                <button
                  onClick={() =>
                    openModalBoxHandle({
                      operation: "logOut",
                      myData: false,
                    })
                  }
                  className={classNames(
                    "text-base font-medium text-myText bg-serviceMenuBtnBack shadow-md px-2 flex items-center justify-center rounded-sm !h-8 duration-200 hover:bg-red-700 hover:text-white",
                    {
                      "!h-6 !text-sm": isTablet,
                    },
                    {
                      "!h-6 !text-xs": isMobile,
                    }
                  )}
                >
                  {t("logOut")}
                </button>
                <div className="flex gap-2 items-center">
                  {languages.map(
                    (lng, i) =>
                      lng !== i18n.language && (
                        <button
                          key={i}
                          onClick={() => i18n.changeLanguage(lng)}
                          className={classNames(
                            "text-mytext text-base hover:text-ksGreen font-medium bg-goUpButtonBack px-1.5  h-full rounded-sm duration-200",
                            {
                              "!text-sm": isTablet,
                            },
                            {
                              "!underline !pointer-events-none !opacity-70":
                                lng === i18n.language,
                            }
                          )}
                        >
                          {lng.toUpperCase()}
                        </button>
                      )
                  )}
                </div>
                <div className="h-8 flex items-center">
                  <ThemeButton />
                </div>
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
