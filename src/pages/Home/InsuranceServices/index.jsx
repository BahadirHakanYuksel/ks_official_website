import { useState } from "react";
import HomeTitle from "../../../components/HomeTitle";
import classNames from "classnames";
import ServiceBox from "./ServiceBox";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../../Context";

function InsuranceServices() {
  const [ActiveServiceId, setActiveServiceId] = useState(0);
  const { t } = useTranslation();
  const { isTablet, isMobile } = useResponsiveData();
  const { individual, corporate } = useSelector((state) => state.app);
  const controlButtons = [
    {
      text: t("individual"),
      id: 0,
    },
    {
      text: t("corporate"),
      id: 1,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <HomeTitle>{t("insuranceServices")}</HomeTitle>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2.5">
          {controlButtons.map((btn) => (
            <button
              onClick={() => setActiveServiceId(btn.id)}
              key={btn.id}
              className={classNames(
                "bg-ksGray text-white w-32 h-10 rounded-full border-2 border-solid border-transparent hover:border-ksGreen duration-200 text-base shadow-md opacity-70 hover:opacity-100",
                {
                  "!bg-ksGreen !opacity-100": ActiveServiceId === btn.id,
                },
                {
                  "!text-sm font-medium !w-28 !h-9": isTablet,
                }
              )}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
      <div
        className={classNames("flex flex-wrap justify-center gap-5", {
          "!gap-2.5": isMobile,
        })}
      >
        {ActiveServiceId === 0 &&
          individual.map((service, i) => (
            <ServiceBox
              category="individual"
              title={service.title}
              iconUrl={service.iconUrl}
              key={service.id}
            />
          ))}
        {ActiveServiceId === 1 &&
          corporate.map((service, i) => (
            <ServiceBox
              category="corporate"
              title={service.title}
              iconUrl={service.iconUrl}
              key={service.id}
            />
          ))}
      </div>
    </div>
  );
}

export default InsuranceServices;
