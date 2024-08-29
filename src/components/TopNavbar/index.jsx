import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";

function TopNavbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const myUrls = [
    {
      url: "/what-is-participation-insurance",
      title: t("what-is-the-ks") + " ?",
      id: 0,
    },
  ];

  const languages = ["tr", "en"];

  return (
    <>
      {!isMobile && (
        <div
          className={classNames(
            "w-full h-5 flex items-center justify-end page"
          )}
        >
          <div className="flex items-center gap-3.5">
            {myUrls.map((url) => (
              <button
                className={classNames(
                  "text-gray-400 text-xs hover:text-ksGreen font-medium",
                  {
                    "!text-[11px]": isLaptop,
                  },
                  {
                    "!text-[9px]": isTablet,
                  }
                )}
                onClick={() => navigate(url.url)}
                key={url.id}
              >
                {url.title}
              </button>
            ))}

            <div className="flex gap-2 items-center">
              {languages.map(
                (lng) =>
                  lng !== i18n.language && (
                    <button
                      onClick={() => i18n.changeLanguage(lng)}
                      className={classNames(
                        "text-gray-400 text-xs hover:text-ksGreen font-medium",
                        {
                          "!text-[11px]": isLaptop,
                        },
                        {
                          "!text-[9px]": isTablet,
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
          </div>
        </div>
      )}
    </>
  );
}

export default TopNavbar;
