import { useState } from "react";
import HomeTitle from "../../../components/HomeTitle";
import classNames from "classnames";
import ServiceBox from "./ServiceBox";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function InsuranceServices() {
  const [ActiveServiceId, setActiveServiceId] = useState(0);
  const { t } = useTranslation();
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
      <HomeTitle>Sigorta Hizmetleri</HomeTitle>
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
                }
              )}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {ActiveServiceId === 0 &&
          individual.map((service, i) => (
            <ServiceBox
              category={t("individual")}
              title={service.title}
              iconUrl={service.iconUrl}
              key={service.id}
            />
          ))}
        {ActiveServiceId === 1 &&
          corporate.map((service, i) => (
            <ServiceBox
              category={t("corporate")}
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
