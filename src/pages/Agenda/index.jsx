import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import PageTitle from "../../components/PageTitle";
import ErrorPage from "../ErrorPage";
import AgendaBox from "../../components/AgendaBox";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useResponsiveData } from "../../Context";
import { Helmet } from "react-helmet-async";

function Agenda() {
  const { i18n, t } = useTranslation();
  const { isTablet, isMobile } = useResponsiveData();
  const { pathAgendaCategory } = useParams();
  const [localDataPath, setLocalDataPath] = useState(pathAgendaCategory);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [thisPageIsAgenda, setThisPageIsAgenda] = useState(true);
  const [ksData, setKsData] = useState([]);
  const [filter, setFilter] = useState("last");
  const [filterControl, setfilterControl] = useState(filter);
  const navigate = useNavigate();
  const [pointAnimCount, setPointAnimCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const pointAnimArr = [".", "..", "..."];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const request_url = import.meta.env.VITE_REQUEST_URL;

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

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setPointAnimCount((count) => (count < 2 ? count + 1 : 0));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const getDataOnDb = async (reset = false) => {
    setLoading(true);

    const limit = 9;
    const offset = (currentPage - 1) * limit;

    const formData = new FormData();
    formData.append(
      "action",
      filter === "last"
        ? pathAgendaCategory
        : `${pathAgendaCategory}_most_viewed`
    );
    formData.append("page", currentPage);
    formData.append("offset", offset);

    try {
      const response = await fetch(request_url, {
        method: "POST",
        body: formData,
      });

      const { data, totalPages: total } = await response.json();

      setKsData((prevData) => (reset ? data : [...prevData, ...data]));
      setTotalPages(total);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAgendaCategory = async () => {
    document.scrollingElement.scrollTop = 0;

    const categoryMatch = categories.find(
      (category) =>
        convertFromTextToUrl(category.urlName) === pathAgendaCategory
    );

    if (categoryMatch) {
      setActiveCategoryId(categoryMatch.id);
      setThisPageIsAgenda(true);
    } else {
      setThisPageIsAgenda(false);
    }

    if (pathAgendaCategory !== localDataPath) {
      setLocalDataPath(pathAgendaCategory);
      setCurrentPage(1);
      await getDataOnDb(true);
    }
  };

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    updateAgendaCategory();
  }, [pathAgendaCategory]);

  useEffect(() => {
    getDataOnDb(currentPage === 1);
  }, [currentPage]);

  useEffect(() => {
    if (filterControl !== filter) {
      setfilterControl(filter);
      setCurrentPage(1);
    }
    getDataOnDb(true);
  }, [filter]);

  return (
    <>
      {thisPageIsAgenda ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          <Helmet>
            <title>{categories[activeCategoryId]?.title}</title>
          </Helmet>
          <PageTitle>{categories[activeCategoryId]?.title}</PageTitle>
          <div className="page flex flex-col gap-5">
            <div
              className={classNames("flex justify-between items-center", {
                "!items-center !gap-5 !flex-col": isTablet,
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
              <div className={classNames("flex")}>
                <button
                  onClick={() => setFilter("last")}
                  className={classNames(
                    "text-titleColor border-b-2 border-solid border-ksGrayTp h-10 min-w-32 text-base font-medium duration-200 opacity-70",
                    {
                      "!border-ksGreen !text-myText !pointer-events-none !opacity-100":
                        filter === "last",
                    },
                    {
                      "!text-sm": isMobile,
                    }
                  )}
                >
                  {t("lastPublished")}
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className={classNames(
                    "text-titleColor border-b-2 border-solid border-ksGrayTp h-10 min-w-32 text-base font-medium duration-200 opacity-70",
                    {
                      "!border-ksGreen !text-myText !pointer-events-none !opacity-100":
                        filter === "popular",
                    },
                    {
                      "!text-sm": isMobile,
                    }
                  )}
                >
                  {t("mostRead")}
                </button>
              </div>
            </div>
            {loading ? (
              <motion.div
                className="text-2xl font-medium flex items-center justify-center min-h-[200px] text-ksGreen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {t("loading").replace("...", pointAnimArr[pointAnimCount])}
              </motion.div>
            ) : (
              <>
                <div
                  className={classNames(
                    "flex justify-between gap-y-8 flex-wrap",
                    {
                      "!justify-start !gap-x-20": ksData.length < 3,
                    },
                    {
                      "!gap-x-10 !justify-center": isTablet,
                    }
                  )}
                >
                  {ksData.length > 0 ? (
                    ksData.map((box) => (
                      <AgendaBox
                        key={box.id}
                        agendaImgUrl={box.img_url}
                        agendaTitle={box.title}
                        agendaDate={box.dat}
                        ksId={box.ks_id}
                        category={categories[activeCategoryId]?.urlName}
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
                      {t("current")} {categories[activeCategoryId]?.title}{" "}
                      {t("comingSoon")}
                    </motion.div>
                  )}
                </div>
                {currentPage < totalPages && ksData.length > 0 && (
                  <center>
                    <button
                      onClick={loadMore}
                      className={classNames(
                        "rounded-full bg-preKsBoxBack w-full text-myText border-2 border-solid border-ksGrayTp hover:border-ksGreen h-16 min-w-36 text-base font-medium duration-200",
                        {
                          "!text-sm !h-12 !w-[290px]": isMobile,
                        }
                      )}
                    >
                      {loading
                        ? t("loading").replace(
                            "...",
                            pointAnimArr[pointAnimCount]
                          )
                        : t("more") + " "}

                      {i18n.language === "tr"
                        ? categories[activeCategoryId].title.slice(0, -3)
                        : categories[activeCategoryId].title}
                    </button>
                  </center>
                )}
              </>
            )}
          </div>
        </motion.div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default Agenda;
