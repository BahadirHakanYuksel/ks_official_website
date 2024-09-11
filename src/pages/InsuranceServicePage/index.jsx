import { AnimatePresence, motion } from "framer-motion";
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
import { Helmet } from "react-helmet-async";

function InsuranceServicePage() {
  const { individual, corporate, activeService } = useSelector(
    (state) => state.app
  );
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const { pathServiceCategory, pathServiceName } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeServiceButtonIndex, setActiveServiceButtonIndex] = useState(1);
  const [responsiveServiceMenuIsOpen, setResponsiveServiceMenuIsOpen] =
    useState(false);

  const categories = [t("individual"), t("corporate")];
  const urlCategories = ["individual", "corporate"];
  const mainIndividualContents = [
    {
      text: "dask.txt",
      id: 0,
    },
    {
      text: "Neoenerejik",
      id: 1,
    },
    {
      text: "ferdi-kaza.txt",
      id: 2,
    },
    {
      text: "kasko.txt",
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
      text: "dask.txt",
      id: 0,
    },
    {
      text: "zorunlu trafik sigortası",
      id: 1,
    },
    {
      text: "ferdi-kaza.txt",
      id: 2,
    },
    {
      text: "kasko.txt",
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
      if (thisMyService.length === 0) {
        updateServiceHandle(false);
      } else {
        const thisMyMainContent = mainIndividualContents.filter((content) => {
          return content.id === thisMyService[0].id;
        });

        updateServiceHandle(thisMyService[0]);
        setActiveCategoryIndex(0);
        setActiveServiceButtonIndex(1);
        updateMainContentHandle(
          `/services_data/tr/${thisMyMainContent[0].text}`
        );
      }
    }
    if (pathServiceCategory === "corporate") {
      const thisMyService = corporate.filter((service) => {
        return (
          encodeURIComponent(
            turkishToEnglish(service.title.replace(/ /g, "-"))
          ).toLowerCase() === pathServiceName
        );
      });

      if (thisMyService.length === 0) {
        updateServiceHandle(false);
      } else {
        const thisMyMainContent = mainCorporateContents.filter((content) => {
          return content.id === thisMyService[0].id;
        });
        updateServiceHandle(thisMyService[0]);
        setActiveCategoryIndex(1);
        setActiveServiceButtonIndex(0);
        updateMainContentHandle(
          `/services_data/tr/${thisMyMainContent[0].text}`
        );
      }
    }
  };

  useEffect(() => {
    serviceControl();
    if (isTablet) {
      setResponsiveServiceMenuIsOpen(false);
      setTimeout(() => {
        document.scrollingElement.scrollTop = 0;
      }, 600);
    } else document.scrollingElement.scrollTop = 0;
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
    if (isTablet) {
      setResponsiveServiceMenuIsOpen(false);
      setTimeout(() => {
        document.scrollingElement.scrollTop = 0;
        navigate(
          `/${encodeURIComponent(
            turkishToEnglish(
              urlCategories[activeCategoryIndex].replace(/ /g, "-")
            )
          ).toLowerCase()}/${encodeURIComponent(
            turkishToEnglish(title.replace(/ /g, "-"))
          ).toLowerCase()}`
        );
      }, 600);
    } else {
      document.scrollingElement.scrollTop = 0;
      navigate(
        `/${encodeURIComponent(
          turkishToEnglish(
            urlCategories[activeCategoryIndex].replace(/ /g, "-")
          )
        ).toLowerCase()}/${encodeURIComponent(
          turkishToEnglish(title.replace(/ /g, "-"))
        ).toLowerCase()}`
      );
    }
  };

  return (
    <>
      {activeService ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-5"
        >
          <Helmet>
            <title>{activeService.title}</title>
          </Helmet>
          <PageTitle>{activeService.title}</PageTitle>
          <div className="servicePageGrid grid gap-5">
            {isTablet && (
              <div
                className={classNames(
                  "sticky left-0 top-12 flex items-center justify-between",
                  {
                    "!bg-backColor": responsiveServiceMenuIsOpen,
                  }
                )}
              >
                <button
                  onClick={() =>
                    setResponsiveServiceMenuIsOpen(!responsiveServiceMenuIsOpen)
                  }
                  className={classNames(
                    " bg-serviceMenuBack text-myText w-36 h-8 rounded-sm active:bg-ksGreen active:text-white font-medium duration-200",
                    {
                      "!text-xs !w-auto !px-2.5": isMobile,
                    },
                    {
                      "!rounded-t-lg": responsiveServiceMenuIsOpen,
                    }
                  )}
                >
                  {t("otherServices")}
                </button>
                <AnimatePresence>
                  {responsiveServiceMenuIsOpen && (
                    <motion.button
                      onClick={() => setResponsiveServiceMenuIsOpen(false)}
                      opacity={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={classNames(
                        "bg-black text-myText w-20 h-8 text-white rounded-sm active:bg-black active:text-white font-medium rounded-t-lg",
                        {
                          "!text-xs !w-auto !px-2.5": isMobile,
                        }
                      )}
                    >
                      {i18n.language === "en" ? "Close" : "Kapat"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}
            <AnimatePresence>
              {responsiveServiceMenuIsOpen && isTablet && (
                <motion.div
                  initial={{ height: 0, opacity: 0, visibility: "hidden" }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    visibility: "visible",
                  }}
                  transition={{ duration: 0.5 }}
                  exit={{ height: 0, opacity: 0, visibility: "hidden" }}
                  className={classNames(
                    "bg-serviceMenuBack shadow-md rounded-md p-3 flex flex-col gap-5 sticky left-0 h-0 top-[80px] w-full overflow-hidden",
                    {
                      "!rounded-t-none": responsiveServiceMenuIsOpen,
                    }
                  )}
                >
                  <div className=" flex justify-center items-center">
                    <header
                      className={classNames(
                        "text-xl h-8 font-medium relative",
                        {
                          "!text-lg": isLaptop,
                        }
                      )}
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
                                  turkishToEnglish(
                                    service.title.replace(/ /g, "-")
                                  )
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
                                  turkishToEnglish(
                                    service.title.replace(/ /g, "-")
                                  )
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
                    {i18n.language === "tr"
                      ? `${categories[activeServiceButtonIndex]} Hizmetlere Git`
                      : `Go to ${categories[activeCategoryIndex]} Services`}
                  </button>
                </motion.div>
              )}
              {!isTablet && (
                <div
                  className={classNames(
                    "bg-serviceMenuBack shadow-md rounded-md p-3 flex flex-col gap-5 h-[514px] sticky top-14",
                    {
                      "!sticky !left-0 !top-14 !w-full !overflow-hidden":
                        isTablet,
                    }
                  )}
                >
                  <div className=" flex justify-center items-center">
                    <header
                      className={classNames(
                        "text-xl h-8 font-medium relative",
                        {
                          "!text-lg": isLaptop,
                        }
                      )}
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
                                  turkishToEnglish(
                                    service.title.replace(/ /g, "-")
                                  )
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
                                  turkishToEnglish(
                                    service.title.replace(/ /g, "-")
                                  )
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
                    {i18n.language === "tr"
                      ? `${categories[activeServiceButtonIndex]} Hizmetlere Git`
                      : `Go to ${categories[activeCategoryIndex]} Services`}
                  </button>
                </div>
              )}
            </AnimatePresence>
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
