import { useNavigate } from "react-router-dom";
import FooterHeader from "../FooterHeader";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../../Context";

function FooterBox({ title, description, url = "/", type = 0 }) {
  const navigation = useNavigate();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const { t } = useTranslation();

  const categories = [
    {
      urlName: "/agenda/news",
      title: t("news"),
      dbKeyUrl: "",
      id: 0,
    },
    {
      urlName: "/agenda/articles",
      title: t("articles"),
      dbKeyUrl: "",
      id: 1,
    },
    {
      urlName: "/agenda/announcements",
      title: t("announcements"),
      dbKeyUrl: "",
      id: 2,
    },
  ];

  return (
    <>
      <div
        className={classNames("flex flex-col gap-2.5 py-3 bg-opacity-20", {
          "!py-2": isLaptop,
        })}
      >
        <FooterHeader>{title}</FooterHeader>
        <p
          className={classNames("text-myText text-sm line-clamp-5", {
            "!text-[13px]": isLaptop,
          })}
        >
          {description}
        </p>
        {type !== 1 && (
          <div
            className={classNames("flex items-center", {
              "justify-start": type === 0,
              "justify-end": type === 2,
            })}
          >
            <button
              onClick={() => navigation(url)}
              className={classNames(
                "mt-2 h-8 w-28 font-medium rounded-sm text-[13px] text-white hover:bg-ksGreen duration-200 bg-ksGray",
                {
                  "!text-xs !h-7 !w-24 !mt-5": isLaptop,
                }
              )}
            >
              {t("readMore")}
            </button>
          </div>
        )}
        {type === 1 && (
          <div className="flex flex-col gap-2.5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigation(category.urlName)}
                className={classNames(
                  "h-8 w-full font-medium rounded-full text-sm hover:text-white hover:bg-ksGreen duration-200 bg-footerAgendaButtonBack text-myText",
                  {
                    "!text-[13px] !h-[30px]": isLaptop,
                  }
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FooterBox;
