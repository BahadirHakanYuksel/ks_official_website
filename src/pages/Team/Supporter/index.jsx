import { useEffect, useState } from "react";
import { useResponsiveData } from "../../../Context";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export default function Supporter({
  img_url = false,
  social_links = false,
  name_and_surname = "Undefined Supporter",
  description,
}) {
  const [hasLinks, setHasLinks] = useState(false);
  const { isMobile } = useResponsiveData();
  const { t } = useTranslation();
  const socialLinksControl = () => {
    let activeLinkCounter = 0;

    social_links.forEach((sl) => {
      sl.link && activeLinkCounter++;
    });

    activeLinkCounter > 0 ? setHasLinks(true) : setHasLinks(false);
  };

  useEffect(() => {
    socialLinksControl();
  }, []);

  return (
    <div className="supporterCard w-[320px] aspect-square h-auto bg-preKsBoxBack border-2 border-solid border-ksGrayTp hover:border-ksGreen rounded-md duration-200 p-5 pt-14 pb-10 shadow-lg relative">
      <div
        className={classNames(
          "absolute left-1/2 -translate-x-1/2 bg-goUpButtonBack border-4 border-solid border-backColor w-[90px] h-auto aspect-square rounded-lg -top-[90px] translate-y-1/2 text-titleColor font-medium text-4xl flex items-center justify-center overflow-hidden",
          {
            "!text-2xl": isMobile,
          }
        )}
      >
        {img_url ? (
          <img src={img_url} className="w-full aspect-square" alt="" />
        ) : (
          <div className="bg-transparent">
            {name_and_surname.split(" ").map(
              (word, i) =>
                i < 3 && (
                  <span key={i} className="text-ksGreen">
                    {word.slice(0, 1).toUpperCase()}
                  </span>
                )
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3.5">
        <header
          title={name_and_surname}
          className={classNames(
            "text-center text-xl font-medium text-titleColor line-clamp-1",
            {
              "!text-lg": isMobile,
            }
          )}
        >
          {name_and_surname}
        </header>
        <p className="line-clamp-6 text-sm h-[120px]">{description}</p>

        {hasLinks && (
          <div className="flex flex-col gap-1.5">
            <header className="relative text-sm font-medium text-titleColor ">
              {t("smLinks")}
            </header>
            <div className="flex flex-wrap gap-2.5 items-center">
              {social_links.map(
                (sl, i) =>
                  sl.link && (
                    <a
                      title={sl.name}
                      key={i}
                      href={sl.link}
                      className={classNames(
                        "border-2 border-solid border-ksGrayTp bg-backColor flex items-center justify-center text-myText hover:bg-ksGreen hover:text-white text-base duration-200 w-10 h-10 rounded-full",
                        {
                          "!text-sm !w-9 !h-9": isMobile,
                        }
                      )}
                    >
                      <i className={`fa-brands fa-${sl.name}`}></i>
                    </a>
                  )
              )}
            </div>
          </div>
        )}
        <div className="labelOnSupporter absolute bottom-0 left-0 w-full h-6 bg-ksGreen rounded-t-[40px] flex items-center justify-center font-medium text-sm duration-200 text-white">
          Katılım Sigortası
        </div>
      </div>
    </div>
  );
}
