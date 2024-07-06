import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import ThemeButton from "../ThemeButton";

function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
  ];

  return (
    <div className="w-full h-12 sticky flex items-center justify-between px-[200px]">
      <header className="text-3xl font-semibold text-ksGreen">
        Katılım Sigorta
      </header>
      <div className="flex items-center gap-5">
        {navMenu.map((menu) => (
          <NavLink
            className={({ isActive }) =>
              classNames(
                "text-base text-gray-700 font-medium border-b-2 border-solid border-transparent duration-200 hover:text-gray-900",
                {
                  "!border-ksGreen !text-myText": isActive,
                }
              )
            }
            key={menu.id}
            to={menu.url}
          >
            {menu.title}
          </NavLink>
        ))}
        <ThemeButton />
      </div>
    </div>
  );
}

export default Navbar;
