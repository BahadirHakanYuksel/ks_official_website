import { useNavigate } from "react-router-dom";
import FooterHeader from "../FooterHeader";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

function FooterBox({ title, description, url = "/", type = 0 }) {
  const navigation = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-2.5 py-3 bg-opacity-20">
        <FooterHeader>{title}</FooterHeader>
        <p className="text-myText text-sm line-clamp-5">{description}</p>
        {type !== 1 && (
          <div
            className={classNames("flex items-center", {
              "justify-start": type === 0,
              "justify-end": type === 2,
            })}
          >
            <button
              onClick={() => navigation(url)}
              className={
                "mt-2 h-8 w-28 font-medium rounded-sm text-[13px] text-white hover:bg-ksGray duration-200 bg-ksGreen"
              }
            >
              {t("readMore")}
            </button>
          </div>
        )}
        {type === 1 && (
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => navigation(url)}
              className="h-8 w-full font-medium rounded-full text-sm hover:text-white hover:bg-ksGreen duration-200 bg-footerAgendaButtonBack text-myText"
            >
              {t("news")}
            </button>
            <button
              onClick={() => navigation(url)}
              className="h-8 w-full font-medium rounded-full text-sm hover:text-white hover:bg-ksGreen duration-200 bg-footerAgendaButtonBack text-myText"
            >
              {t("articles")}
            </button>
            <button
              onClick={() => navigation(url)}
              className="h-8 w-full font-medium rounded-full text-sm hover:text-white hover:bg-ksGreen duration-200 bg-footerAgendaButtonBack text-myText"
            >
              {t("announcements")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default FooterBox;
