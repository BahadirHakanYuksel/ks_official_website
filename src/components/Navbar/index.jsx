import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { convertFromTextToUrl, turkishToEnglish } from "../../consts";
import ThemeButton from "../ThemeButton";
import { useEffect, useState } from "react";

function Navbar() {
  const { t, i18n } = useTranslation();
  const path = useLocation().pathname;
  const [activeNavTitleId, setActiveNavTitleId] = useState(0);
  const navigate = useNavigate();

  const navigation = (url, id) => {
    setActiveNavTitleId(id);
    navigate(url);
  };

  const whenChangingLanguage = () => {
    const myPageUrl = path.split("/");
    navMenu.forEach((button) => {
      console.log(
        encodeURIComponent(turkishToEnglish(button.title).toLowerCase()),
        myPageUrl[1]
      );
      if (
        encodeURIComponent(turkishToEnglish(button.title).toLowerCase()) ===
        myPageUrl[1]
      )
        setActiveNavTitleId(button.id);
    });
  };

  useEffect(() => {
    whenChangingLanguage();
  }, [i18n.language]);

  const navMenu = [
    {
      url: "/",
      title: t("home"),
      id: 0,
    },
    {
      url: `/${convertFromTextToUrl(t("about-us"))}`,
      title: t("about-us"),
      id: 1,
    },
    {
      url: `/${convertFromTextToUrl(t("contact"))}`,
      title: t("contact"),
      id: 2,
    },
    {
      url: false,
      title: t("agenda"),
      subCategories: [
        {
          url: "haberler",
          title: "Haberler",
          id: 0,
        },
        {
          url: "makaleler",
          title: "Makaleler",
          id: 1,
        },
        {
          url: "duyurular",
          title: "Duyurular",
          id: 2,
        },
      ],
      id: 3,
    },
  ];

  return (
    <div className="w-full h-12 sticky top-0 left-0 bg-backColor flex items-center justify-between px-[200px] z-20 mb-5">
      <button
        onClick={() => navigate("/")}
        className="flex gap-2.5 items-center active:scale-105 duration-200"
      >
        <div className="bg-ksGray rounded-sm">
          <img src="images/logo.png" className="p-1 w-9" alt="" />
        </div>
        <header className="text-3xl font-semibold text-ksGreen">
          Katılım Sigortası
        </header>
      </button>
      <div className="flex items-center gap-5">
        {navMenu.map((menu) => (
          <button
            onClick={() => navigation(menu.url, menu.id)}
            className={classNames(
              "text-base text-titleColor font-medium border-b-2 border-solid border-transparent duration-200 hover:text-titleColorHover relative",
              {
                "!text-activeTitleColor": menu.id === activeNavTitleId,
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
    </div>
  );
}

export default Navbar;
