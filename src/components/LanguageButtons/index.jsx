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
    <div className="flex items-center gap-2.5">
      {myLanguages.map((lng, i) => (
        <button
          key={i}
          onClick={() => changeLng(lng)}
          className={classNames(
            "w-14 h-7 rounded-sm text-sm font-medium bg-lngBtnBack duration-500 opacity-70 hover:opacity-90",
            {
              "!bg-ksGreen text-white !opacity-100": lng === i18n.language,
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
