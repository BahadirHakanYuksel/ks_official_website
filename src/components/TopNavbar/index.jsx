import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
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
    <div
      className={classNames(
        "w-full h-5 flex items-center justify-end px-[200px]",
        {
          "!px-[50px]": isLaptop,
        },
        {
          "!px-[19px]": isTablet,
        },
        {
          "!px-[10px] !justify-center": isMobile,
        }
      )}
    >
      <div className="flex items-center gap-5">
        {myUrls.map((url) => (
          <button
            className="text-gray-400 text-xs hover:text-gray-600 font-medium"
            onClick={() => navigate(url.url)}
            key={url.id}
          >
            {url.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopNavbar;
