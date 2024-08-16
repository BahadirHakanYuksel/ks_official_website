import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import PageTitle from "../../components/PageTitle";
import ErrorPage from "../ErrorPage";
import AgendaBox from "../../components/AgendaBox";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useResponsiveData } from "../../Context";

function Agenda() {
  const { t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const { pathAgendaCategory } = useParams();
  const [activeCategoryId, setactiveCategoryId] = useState(0);
  const [thisPageIsAgenda, setThisPageIsAgenda] = useState(true);
  const [ksData, setKsData] = useState([]);
  const navigate = useNavigate();

  const getDataOnDb = async () => {
    const formData = new FormData();
    formData.append("action", pathAgendaCategory);

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          if (db.length === 0) setKsData(false);
          else setKsData(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
    let pageControlCounter = 0;
    categories.forEach((category) => {
      convertFromTextToUrl(category.urlName) === pathAgendaCategory
        ? setactiveCategoryId(category.id)
        : pageControlCounter++;

      // console.log(category);
    });
    pageControlCounter === 3
      ? setThisPageIsAgenda(false)
      : setThisPageIsAgenda(true);

    getDataOnDb();
  }, [pathAgendaCategory]);

  const categories = [
    {
      urlName: "news",
      title: t("news"),
      dbKeyUrl: "haber",
      id: 0,
    },
    {
      urlName: "articles",
      title: t("articles"),
      dbKeyUrl: "makale",
      id: 1,
    },
    {
      urlName: "announcements",
      title: t("announcements"),
      dbKeyUrl: "duyuru",
      id: 2,
    },
  ];

  return (
    <>
      {thisPageIsAgenda ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          <PageTitle>{categories[activeCategoryId].title}</PageTitle>
          <div className="page flex flex-col gap-5">
            <div
              className={classNames("flex justify-between items-center", {
                "!justify-center": isTablet,
              })}
            >
              <div
                className={classNames("flex gap-5 items-center", {
                  "!flex-col": isMobile,
                })}
              >
                <header
                  className={classNames(
                    "text-ksGreen font-medium text-xl relative",
                    {
                      "!text-lg": isMobile,
                    }
                  )}
                >
                  {t("otherCategories")}
                  <span
                    className={classNames(
                      "absolute h-full w-0.5 rounded-full bg-ksGrayTp -right-2.5",
                      {
                        "!w-full !h-0.5 -bottom-1 bg-transparent left-0":
                          isMobile,
                      }
                    )}
                  ></span>
                </header>
                <div className="flex gap-2.5">
                  {categories.map(
                    (category) =>
                      category.urlName !== pathAgendaCategory && (
                        <button
                          onClick={() =>
                            navigate(`/agenda/${category.urlName}`)
                          }
                          key={category.id}
                          className={classNames(
                            "rounded-md bg-backColor text-myText border-2 border-solid border-ksGrayTp hover:border-ksGreen h-10 min-w-36 text-base font-medium duration-200",
                            {
                              "!text-sm": isMobile,
                            }
                          )}
                        >
                          {category.title}
                        </button>
                      )
                  )}
                </div>
              </div>
              {/* <div className="flex gap-2.5">
                <button
                  className={classNames(
                    "rounded-md bg-backColor text-myText border-2 border-solid border-ksGrayTp hover:border-ksGreen h-10 min-w-32 text-base font-medium duration-200"
                  )}
                >
                  {t("filter")}
                </button>
              </div> */}
            </div>
            <div
              className={classNames(
                "flex gap-x-[76px] gap-y-8 flex-wrap",
                {
                  "!gap-x-10": isLaptop,
                },
                {
                  "!gap-x-10 justify-center": isTablet,
                }
              )}
            >
              {ksData ? (
                ksData.map((box) => (
                  <AgendaBox
                    key={box.id}
                    agendaImgUrl={box.img_url}
                    agendaTitle={box.title}
                    agendaDate={box.dat}
                    ksId={box.ks_id}
                    category={categories[activeCategoryId].urlName}
                    viewNum={box.number_of_views}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={classNames(
                    "h-[200px] w-full bg-preKsBoxBack text-myText flex items-center justify-center rounded-2xl text-3xl font-medium",
                    {
                      "!text-2xl !h-[180px]": isTablet,
                    },
                    {
                      "!text-sm !h-[120px]": isMobile,
                    }
                  )}
                >
                  {t("current")} {categories[activeCategoryId].title}{" "}
                  {t("comingSoon")}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Agenda;
