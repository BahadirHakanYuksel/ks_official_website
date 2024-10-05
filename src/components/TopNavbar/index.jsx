import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";

function TopNavbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const myUrls = [
    {
      url: "/what-is-participation-insurance",
      title: t("what-is-the-ks") + " ?",
      id: 0,
    },
  ];

  return (
    <>
      {!isMobile && (
        <div
          className={classNames(
            "w-full h-5 flex items-center justify-end page"
          )}
        >
          <div className="flex items-center gap-3.5">
            <a
              href="/KVKK_Form.pdf"
              className={classNames(
                "text-gray-400 text-xs hover:text-ksGreen font-medium",
                {
                  "!text-[11px]": isLaptop,
                },
                {
                  "!text-[9px]": isTablet,
                }
              )}
            >
              KVKK {t("statementText")}
            </a>
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
          </div>
        </div>
      )}
    </>
  );
}

export default TopNavbar;
