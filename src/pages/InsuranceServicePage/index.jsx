import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { turkishToEnglish } from "../../consts";
import PageTitle from "../../components/PageTitle";
import { updateMainContentHandle, updateServiceHandle } from "../../utils";
import { useTranslation } from "react-i18next";
import ErrorPage from "../ErrorPage";
import classNames from "classnames";
import InsuranceServiceContent from "./InsuranceServiceContent";
import { useResponsiveData } from "../../Context";

function InsuranceServicePage() {
  const { individual, corporate, activeService } = useSelector(
    (state) => state.app
  );
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const { pathServiceCategory, pathServiceName } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeServiceButtonIndex, setActiveServiceButtonIndex] = useState(1);

  const categories = [t("individual"), t("corporate")];
  const urlCategories = ["individual", "corporate"];
  const mainIndividualContents = [
    {
      text: "bahadır",
      id: 0,
    },
    {
      text: "Neoenerejik",
      id: 1,
    },
    {
      text: "Ferdi Kaza",
      id: 2,
    },
    {
      text: "Kasko Bireysel",
      id: 3,
    },
    {
      text: "IMM",
      id: 4,
    },
    {
      text: "Zorunlu Trafik",
      id: 5,
    },
    {
      text: "Tamamlayıcı Sağlık",
      id: 6,
    },
    {
      text: "Seyehat sağlık\n###bu şekilde devam ediyor###\n\n##bahadur##\n#başlık#\n--bahadır hakan yüksel--\n**strong**\n* madde1\n* madde 2",
      id: 7,
    },
  ];
  const mainCorporateContents = [
    {
      text: "dask",
      id: 0,
    },
    {
      text: "zorunlu trafik sigortası",
      id: 1,
    },
    {
      text: "Ferdi Kaza sigortası",
      id: 2,
    },
    {
      text: "Kasko Kurumsal",
      id: 3,
    },
    {
      text: "IMM",
      id: 4,
    },
    {
      text: "Tarsim",
      id: 5,
    },
    {
      text: "işyeri",
      id: 6,
    },
    {
      text: t("deneme"),
      id: 7,
    },
  ];
  const serviceControl = () => {
    if (pathServiceCategory === "individual") {
      const thisMyService = individual.filter((service) => {
        return (
          encodeURIComponent(
            turkishToEnglish(service.title.replace(/ /g, "-"))
          ).toLowerCase() === pathServiceName
        );
      });
      const thisMyMainContent = mainIndividualContents.filter((content) => {
        return content.id === thisMyService[0].id;
      });
      updateServiceHandle(thisMyService[0]);
      setActiveCategoryIndex(0);
      setActiveServiceButtonIndex(1);
      updateMainContentHandle(thisMyMainContent[0].text.split("\n"));
    }
    if (pathServiceCategory === "corporate") {
      const thisMyService = corporate.filter((service) => {
        return (
          encodeURIComponent(
            turkishToEnglish(service.title.replace(/ /g, "-"))
          ).toLowerCase() === pathServiceName
        );
      });
      const thisMyMainContent = mainCorporateContents.filter((content) => {
        return content.id === thisMyService[0].id;
      });
      updateServiceHandle(thisMyService[0]);
      setActiveCategoryIndex(1);
      setActiveServiceButtonIndex(0);
      updateMainContentHandle(thisMyMainContent[0].text.split("\n"));
    }
  };

  useEffect(() => {
    serviceControl();
  }, [pathServiceName, pathServiceCategory]);

  const changeCategory = () => {
    if (activeCategoryIndex === 0) {
      setActiveServiceButtonIndex(0);
      setActiveCategoryIndex(1);
    } else {
      setActiveServiceButtonIndex(1);
      setActiveCategoryIndex(0);
    }
  };

  const changeService = (title) => {
    navigate(
      `/${encodeURIComponent(
        turkishToEnglish(urlCategories[activeCategoryIndex].replace(/ /g, "-"))
      ).toLowerCase()}/${encodeURIComponent(
        turkishToEnglish(title.replace(/ /g, "-"))
      ).toLowerCase()}`
    );
  };

  return (
    <>
      {activeService ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-5"
        >
          <PageTitle>{activeService.title}</PageTitle>
          <div className="servicePageGrid grid gap-5">
            <div className="bg-serviceMenuBack shadow-md rounded-md p-3 flex flex-col gap-5">
              <div className=" flex justify-center items-center">
                <header
                  className={classNames("text-xl h-8 font-medium relative", {
                    "!text-lg": isLaptop,
                  })}
                >
                  {categories[activeCategoryIndex]}
                  <div
                    className={classNames(
                      "absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-1/2 bg-ksGreen h-[3px] rounded-full",
                      {
                        "!h-[2px]": isLaptop,
                      }
                    )}
                  ></div>
                </header>
              </div>
              <div className="flex flex-col w-full gap-1.5">
                {activeCategoryIndex === 0 &&
                  individual.map((service) => (
                    <button
                      onClick={() => changeService(service.title)}
                      className={classNames(
                        "flex items-center justify-start bg-serviceMenuBtnBack hover:text-ksGreen border-2 border-solid border-transparent hover:border-ksGreen duration-200 text-sm text-myText font-medium rounded-md px-4 h-10",
                        {
                          "!bg-ksGray !text-ksGreen hover:!border-transparent":
                            encodeURIComponent(
                              turkishToEnglish(service.title.replace(/ /g, "-"))
                            ).toLowerCase() === pathServiceName &&
                            encodeURIComponent(
                              turkishToEnglish(
                                urlCategories[activeCategoryIndex]
                              )
                            ).toLowerCase() === pathServiceCategory,
                        },
                        {
                          "text-xs": isLaptop,
                        }
                      )}
                    >
                      {service.title}
                    </button>
                  ))}
                {activeCategoryIndex === 1 &&
                  corporate.map((service) => (
                    <button
                      onClick={() => changeService(service.title)}
                      className={classNames(
                        "flex items-center justify-start bg-serviceMenuBtnBack hover:text-ksGreen border-2 border-solid border-transparent hover:border-ksGreen duration-200 text-sm text-myText font-medium rounded-md px-4 h-10",
                        {
                          "!bg-ksGray !text-ksGreen hover:!border-transparent":
                            encodeURIComponent(
                              turkishToEnglish(service.title.replace(/ /g, "-"))
                            ).toLowerCase() === pathServiceName &&
                            encodeURIComponent(
                              turkishToEnglish(
                                urlCategories[activeCategoryIndex]
                              )
                            ).toLowerCase() === pathServiceCategory,
                        },
                        {
                          "text-xs": isLaptop,
                        }
                      )}
                    >
                      {service.title}
                    </button>
                  ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-500 bg-opacity-40 w-1/5 rounded-full h-1"></div>
              </div>
              <button
                onClick={changeCategory}
                className={classNames(
                  "h-8 text-base rounded-full hover:bg-green-700 duration-200 text-white flex items-center justify-center font-medium bg-ksGreen",
                  {
                    "text-sm": isLaptop,
                  }
                )}
              >
                {categories[activeServiceButtonIndex]} Hizmetlere Git
              </button>
            </div>
            <InsuranceServiceContent />
          </div>
        </motion.div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default InsuranceServicePage;
