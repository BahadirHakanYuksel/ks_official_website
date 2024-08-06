import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../../Context";
import classNames from "classnames";

function IntroductionOfKs() {
  const { t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  const introductionData = [
    {
      title: t("interestFreeSystem"),
      text: t("iks1"),
      iconUrl: "fa-solid fa-credit-card",
      idNo: 0,
      id: "preKsBox1",
    },
    {
      title: t("riskSharing"),
      text: t("iks2"),
      iconUrl: "fa-solid fa-handshake",
      idNo: 1,
      id: "preKsBox2",
    },
    {
      title: t("transparency"),
      text: t("iks3"),
      iconUrl: "fa-solid fa-eye",
      idNo: 2,
      id: "preKsBox3",
    },
    {
      title: t("communitySupport"),
      text: t("iks4"),
      iconUrl: "fa-solid fa-people-group",
      idNo: 3,
      id: "preKsBox4",
    },
    {
      title: t("ethicalInvestments"),
      text: t("iks5"),
      iconUrl: "fa-solid fa-coins",
      idNo: 4,
      id: "preKsBox5",
    },
  ];

  return (
    <div className={classNames("flex flex-col gap-5")}>
      <div className="presenteKs">
        {introductionData.map((box) => (
          <div
            id={box.id}
            key={box.idNo}
            className={classNames(
              "bg-preKsBoxBack introductionOfKs rounded-md w-full flex flex-col items-center justify-center shadow-md p-3 hover:shadow-ksGreen duration-200 h-[280px] text-myText relative"
            )}
          >
            {box.idNo === 0 ? (
              <div className="relative flex mb-2.5 items-center justify-center w-full">
                <i
                  className={classNames(
                    `${box.iconUrl} text-4xl relative prKsIcon text-preKsBoxIcon duration-200`,
                    {
                      "!text-3xl": isLaptop,
                      "!text-2xl": isTablet,
                    }
                  )}
                >
                  <i
                    className={classNames(
                      "fa-solid fa-xmark absolute -top-2.5 h-5 -right-1 text-2xl text-ksGreen",
                      {
                        "!text-xl -top-2": isLaptop,
                        "!text-lg -top-1.5": isTablet,
                      }
                    )}
                  ></i>
                </i>
                {/* <div className="absolute -bottom-1.5 h-1 rounded-full w-[40px] left-1/2 -translate-x-1/2 bg-ksGreen"></div> */}
              </div>
            ) : (
              <div className="flex items-center justify-center relative mb-2.5">
                <i
                  className={classNames(
                    `${box.iconUrl} text-4xl prKsIcon text-preKsBoxIcon duration-200`,
                    {
                      "!text-3xl": isLaptop,
                      "!text-2xl": isTablet,
                    }
                  )}
                ></i>
                {/* <div className="absolute -bottom-1.5 h-1 rounded-full w-[40px] left-1/2 -translate-x-1/2 bg-ksGreen"></div> */}
              </div>
            )}
            <div className="flex flex-col items-center gap-0.5">
              <header
                className={classNames("text-3xl font-medium", {
                  "!text-2xl": isLaptop,
                  "!text-xl": isTablet,
                })}
              >
                {box.title}
              </header>
              <p
                className={classNames("text-sm font-medium text-green-500", {
                  "!text-[11.5px]": isLaptop,
                  "!text-[10px]": isTablet,
                })}
              >
                {box.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntroductionOfKs;
