import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { updateLngHandle } from "../../utils";
import { useDispatch } from "react-redux";

function LanguageButtons() {
  const myLanguages = ["tr", "en"];
  const { i18n } = useTranslation();

  const changeLng = (lng) => {
    i18n.changeLanguage(lng);
    updateLngHandle(lng);
  };
  return (
    <div className="flex items-center gap-1">
      {myLanguages.map((lng, i) => (
        <button
          key={i}
          onClick={() => changeLng(lng)}
          className={classNames(
            "w-16 h-8 rounded-full text-base font-medium bg-lngBtnBack duration-500",
            {
              "!bg-ksGreen text-white": lng === i18n.language,
            }
          )}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default LanguageButtons;
