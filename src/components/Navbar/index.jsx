import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import ThemeButton from "../ThemeButton";
import { useState } from "react";

function Navbar() {
  const { t } = useTranslation();
  const [activeNavTitleId, setActiveNavTitleId] = useState(0);
  const navigate = useNavigate();

  const navigation = (url, id) => {
    setActiveNavTitleId(id);
    navigate(url);
  };

  const navMenu = [
    {
      url: "/",
      title: t("home"),
      id: 0,
    },
    {
      url: `/${convertFromTextToUrl(t("about"))}`,
      title: t("about"),
      id: 1,
    },
    {
      url: `/${convertFromTextToUrl(t("contact"))}`,
      title: t("contact"),
      id: 2,
    },
    {
      url: false,
      title: "Gündem",
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
      <header className="text-3xl font-semibold text-ksGreen">
        Katılım Sigorta
      </header>
      <div className="flex items-center gap-5">
        {navMenu.map((menu) => (
          <button
            onClick={() => navigation(menu.url, menu.id)}
            className={classNames(
              "text-base text-titleColor font-medium border-b-2 border-solid border-transparent duration-200 hover:text-titleColorHover relative",
              {
                "!border-transparent !text-activeTitleColor":
                  menu.id === activeNavTitleId,
              }
            )}
            key={menu.id}
            to={menu.url}
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
