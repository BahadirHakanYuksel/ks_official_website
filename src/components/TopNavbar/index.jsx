import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import { useTranslation } from "react-i18next";

function TopNavbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const myUrls = [
    {
      url: "/what-is-participation-insurance",
      title: t("what-is-the-ks") + " ?",
      id: 0,
    },
  ];

  return (
    <div className="w-full h-5 flex items-center justify-end px-[200px]">
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
