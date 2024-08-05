import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { convertFromTextToUrl, turkishToEnglish } from "../../consts";
import ThemeButton from "../ThemeButton";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useResponsiveData } from "../../Context";

function Navbar() {
  const { t, i18n } = useTranslation();
  const path = useLocation().pathname;
  const [activeNavTitleId, setActiveNavTitleId] = useState(0);
  const navigate = useNavigate();
  const [navMenuIsActive, setNavMenuIsActive] = useState(false);

  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  const navigation = (url, id) => {
    setActiveNavTitleId(id);
    navigate(url);
  };

  useEffect(() => {
    const keyWord = path.split("/")[1];
    if (keyWord !== "" && keyWord !== "about" && keyWord !== "contact") {
      setActiveNavTitleId(99);
    }
    navMenu.forEach((button) => {
      if (button.url === path) setActiveNavTitleId(button.id);
      if (button.id === 3 && path.split("/")[1] === "agenda")
        setActiveNavTitleId(button.id);
    });
  }, [path]);

  const navMenu = [
    {
      url: "/",
      title: t("home"),
      id: 0,
    },
    {
      url: "/about",
      title: t("about-us"),
      id: 1,
    },
    {
      url: "/contact",
      title: t("contact"),
      id: 2,
    },
    {
      url: false,
      title: t("agenda"),
      id: 3,
      subCategories: [
        {
          subUrl: "news",
          title: t("news"),
          id: 0,
        },
        {
          subUrl: "articles",
          title: t("articles"),
          id: 1,
        },
        {
          subUrl: "announcements",
          title: t("announcements"),
          id: 2,
        },
      ],
    },
  ];

  return (
    <div
      className={classNames(
        "w-full h-12 sticky top-0 left-0 bg-backColor flex items-center justify-between px-[200px] z-20 mb-5",
        {
          "!px-[50px]": isLaptop,
        },
        {
          "!px-[19px]": isTablet,
        },
        {
          "!px-[10px]": isMobile,
        }
      )}
    >
      <AnimatePresence>
        {navMenuIsActive && (
          <motion.div
            initial={{ opacity: 0, top: 40 }}
            animate={{ opacity: 1, top: 64 }}
            exit={{ opacity: 0, top: 40 }}
            className={classNames(
              "absolute top-12 w-[150px] right-52 rounded-md overflow-hidden bg-preKsBoxBack shadow-lg flex flex-col gap-1 p-1.5",
              {
                "!right-16 !top-12": isLaptop,
                "!right-10 !top-12 !w-[120px]": isTablet,
              }
            )}
          >
            {navMenu[3].subCategories?.map((btn) => (
              <button
                key={btn.id}
                onClick={() => {
                  setNavMenuIsActive(false);
                  navigate(`/agenda/${btn.subUrl}`);
                }}
                className={classNames(
                  "h-9 hover:bg-ksGreen hover:text-white duration-150 rounded-md text-sm font-medium w-full bg-footerAgendaButtonBack text-nowrap",
                  {
                    "!h-8 !text-xs": isTablet,
                  }
                )}
              >
                {btn.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          setActiveNavTitleId(0);
          navigate("/");
        }}
        className="flex gap-2.5 items-center active:scale-105 duration-200"
      >
        <div className="!bg-ksgray rounded-sm">
          <img
            src="images/logo.png"
            className={classNames("p-1 w-9", {
              "!w-7": isTablet,
            })}
            alt=""
          />
        </div>
        <header
          className={classNames(
            "text-3xl font-semibold text-ksGreen",
            {
              "!text-2xl": isTablet,
            },
            {
              "!text-lg": isMobile,
            }
          )}
        >
          Katılım Sigortası
        </header>
      </button>
      {!isMobile && (
        <div className="flex items-center gap-5">
          {navMenu.map((menu) => (
            <button
              onClick={() => {
                navigation(menu.url, menu.id);
                menu.id === 3 && setNavMenuIsActive(!navMenuIsActive);
              }}
              className={classNames(
                "text-base text-titleColor font-medium border-b-2 border-solid border-transparent duration-200 hover:text-titleColorHover relative",
                {
                  "!text-activeTitleColor": menu.id === activeNavTitleId,
                },
                {
                  "!text-sm": isTablet,
                }
              )}
              key={menu.id}
            >
              {menu.title}
              <div
                className={classNames(
                  "absolute -bottom-1 w-0 left-1/2 -translate-x-1/2 bg-ksGray rounded-full h-[3px] duration-200",
                  {
                    "!w-full !bg-ksGreen": menu.id === activeNavTitleId,
                  }
                )}
              ></div>
            </button>
          ))}
          <ThemeButton />
        </div>
      )}
      {isMobile && (
        <button className="flex items-center justify-center text-xs bg-preKsBoxBack text-myText hover:text-ksGreen duration-200 w-6 h-6 rounded-sm">
          <i className="fa-solid fa-bars"></i>
        </button>
      )}
    </div>
  );
}

export default Navbar;
