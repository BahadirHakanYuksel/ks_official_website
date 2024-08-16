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
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam optio nulla voluptate repellat reprehenderit! Voluptas neque, maiores quam, quibusdam laborum tempora doloribus praesentium debitis inventore optio porro, id esse asperiores nostrum temporibus quaerat laudantium recusandae cumque suscipit magni alias corporis consequatur! Labore voluptatum, quisquam totam officia perspiciatis animi earum nesciunt aspernatur repellendus, nulla placeat maxime eaque, quod nam ut! Sunt maiores ut nulla recusandae sit corporis accusantium, placeat obcaecati esse odit est consectetur, ducimus doloremque quia laudantium repudiandae perferendis facilis doloribus facere. Animi qui quod quam commodi accusamus officia, distinctio obcaecati voluptas neque non fugit exercitationem. Fugit quos nihil voluptatibus architecto beatae perspiciatis ut, placeat corporis corrupti porro, animi voluptate obcaecati culpa ducimus possimus at molestias alias error consequatur quo. Beatae perferendis error in vitae iure corporis repellat dolores incidunt, dolorem placeat repudiandae tempore harum consequuntur quae quam quibusdam animi eos quasi sit vero excepturi ducimus tempora! Eos officia et adipisci sed labore iste quis autem harum culpa ut, voluptatum similique voluptates corrupti facere soluta ab iure maxime molestiae earum minima voluptas veniam. Accusantium, at velit cumque qui tempora veniam. Maiores hic, quod, totam accusantium quo voluptas quos eos ab quasi possimus cum id! Adipisci velit vitae tempore numquam obcaecati itaque autem, repellat, sequi nesciunt reprehenderit cupiditate! Voluptatibus at ea totam quisquam a incidunt ipsa, repellendus illo reiciendis accusamus maxime esse laborum natus nostrum dolorum laboriosam minima delectus, animi temporibus dignissimos aperiam omnis? Aliquid, in distinctio? Ullam obcaecati, repellat ratione blanditiis unde similique quibusdam consectetur. Unde dolore sed, numquam, tempore odio debitis aperiam provident eos est fugit quasi ratione dolor itaque odit necessitatibus tempora voluptatum? Temporibus cupiditate aliquam quia ab ipsa ex cum eius incidunt aspernatur sint tempore, inventore libero autem doloremque animi voluptas molestias, quisquam consequuntur repellendus sit dolores iusto qui! Quod culpa dolores quo tenetur qui deserunt quasi non mollitia quos, laudantium nulla magni voluptates corrupti ut itaque commodi! Nam incidunt sequi error ipsam, suscipit, pariatur unde fuga impedit ut qui, voluptatum quia nobis veniam quibusdam cum non excepturi sunt nisi debitis. Minima ducimus nesciunt consequuntur mollitia iste autem esse a ipsa, sunt repellat eos debitis molestiae soluta commodi modi recusandae illum ad reprehenderit quis? Magni commodi incidunt minus voluptatibus quis cum molestias aut at, ad, nesciunt placeat distinctio id. Nostrum ex quia, reiciendis labore culpa laborum at incidunt. Facilis voluptates porro distinctio ex soluta, cumque dicta, ipsum a amet rem iusto magni, fuga suscipit? Sed voluptate sit distinctio non aperiam quaerat aspernatur voluptatibus optio voluptatem. Necessitatibus earum eius labore non porro aut libero quas, sed odit magnam commodi, ipsum eum nam in cumque ducimus consequatur. Blanditiis nemo quisquam consequuntur dignissimos optio qui harum libero voluptatem molestiae hic nulla voluptas quos voluptates animi cumque, labore inventore? Incidunt doloremque qui magni atque ad consectetur vel voluptas earum voluptate modi at eius, impedit voluptatem velit quos! Minima enim mollitia quo culpa officiis voluptas aut ea vel? Quam praesentium eaque aliquam dolorum. Iure magnam assumenda reiciendis possimus asperiores sequi corrupti fugiat ad totam iusto eius quos molestias similique accusantium, quibusdam nulla ex, est non vel. Rem obcaecati modi ducimus! Magnam molestias, illo mollitia natus est voluptatum iste voluptatem officia dolore illum temporibus minima. Id nobis praesentium earum suscipit dicta quaerat obcaecati magnam vel perferendis cupiditate optio est eum ex numquam non minima reiciendis amet ullam alias, voluptatibus enim facere autem! Blanditiis distinctio eius, ad et odit necessitatibus facilis suscipit dolor? Voluptates provident iste natus illum distinctio magni repellat odit. Facere adipisci excepturi natus impedit voluptas hic magnam. Corporis in doloremque consectetur delectus exercitationem aperiam doloribus sapiente, voluptate sunt. Quibusdam, perferendis! Autem veritatis, tenetur repellat sed, optio at non id, dolor aspernatur et explicabo doloremque exercitationem quia vel asperiores sapiente incidunt minus illum? Recusandae sequi maiores sed, numquam explicabo dolor laborum vero quos est omnis nostrum. Facere sapiente blanditiis libero molestias? Labore modi officia ea facilis fugiat accusamus quis! Non animi quasi tempore cupiditate tempora nobis eligendi nesciunt adipisci atque voluptatum totam deleniti molestiae laboriosam saepe aliquam quibusdam unde alias corrupti, quod ut corporis culpa labore velit officiis. Error numquam ea, quae beatae reprehenderit officia voluptate dolorum cupiditate. Reprehenderit blanditiis dolore dignissimos debitis. Mollitia exercitationem assumenda obcaecati, atque nemo nulla libero. Aspernatur earum cupiditate velit veniam libero inventore quo ad deleniti rem possimus nobis perferendis deserunt eos, impedit ut autem consequatur labore ab magnam ea officia aut. Reiciendis asperiores, dignissimos suscipit, minima soluta accusantium accusamus iste eveniet, quod necessitatibus a explicabo assumenda aspernatur! Ullam nihil excepturi sit inventore fugiat ipsa facilis deleniti totam voluptatum quae consequuntur in pariatur, nemo nobis animi, praesentium at soluta non dolor quia! Cumque, ipsum libero. Ipsa, ullam. Quidem accusantium molestiae recusandae ipsa porro, officia quisquam, quo harum deserunt quaerat voluptas doloribus libero inventore fuga eos est sunt suscipit voluptatum ad optio placeat fugiat id. Praesentium officiis quibusdam consequatur natus commodi ducimus debitis ipsum consectetur velit dolorum illum facilis quos porro optio iure eum nisi molestias sint doloribus, placeat error accusantium nam voluptatum a. Harum exercitationem, ratione necessitatibus deserunt dolore obcaecati nisi minus dolorem, quas iste, nam dolorum facilis voluptatem suscipit. Vero doloremque accusamus, cum rem vitae officia unde dolorum error fugiat et eum repellat soluta deleniti quis dolorem sit ut culpa consequuntur, incidunt magnam illum nisi officiis voluptates eligendi. Inventore, itaque libero, eaque id magnam non totam deserunt labore, quisquam laborum ipsum autem? Veniam nisi nemo animi, quas, deleniti numquam dolore non tempora repudiandae quia, maxime sit dolorum? Explicabo repellendus officiis exercitationem cum, nostrum praesentium aut harum minus deleniti totam quos veritatis quaerat. Numquam neque maiores quia dignissimos rem tempora aut est facere quis tempore, praesentium, accusantium maxime. Sed optio deleniti, at velit nesciunt corrupti dignissimos dolores quasi voluptatibus consectetur. Autem veritatis, ipsum corporis ipsa nobis voluptates assumenda atque voluptatibus incidunt maiores reiciendis vel repellat quam quae tempora dolores velit. Corrupti mollitia ipsum sit at autem debitis sequi? Blanditiis dolore libero, eius excepturi fugiat voluptatum molestiae consequuntur! Illum totam voluptate non libero at. Quam, commodi molestias eum, eaque suscipit soluta dignissimos sunt dolorum excepturi ut numquam ducimus similique alias cumque minima quia reprehenderit, laborum hic. A, praesentium.",
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
      if (thisMyService.length === 0) {
        updateServiceHandle(false);
      } else {
        const thisMyMainContent = mainIndividualContents.filter((content) => {
          return content.id === thisMyService[0].id;
        });

        updateServiceHandle(thisMyService[0]);
        setActiveCategoryIndex(0);
        setActiveServiceButtonIndex(1);
        updateMainContentHandle(thisMyMainContent[0].text.split("\n"));
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
        updateMainContentHandle(thisMyMainContent[0].text.split("\n"));
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
