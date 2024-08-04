import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import PageTitle from "../../components/PageTitle";
import ErrorPage from "../ErrorPage";
import AgendaBox from "../../components/AgendaBox";
import classNames from "classnames";
import { motion } from "framer-motion";

function Agenda() {
  const { t } = useTranslation();
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
          setKsData(db);
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
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <header className="text-ksGreen font-medium text-xl relative">
                  {t("otherCategories")}
                  <span className="absolute h-full w-0.5 rounded-full bg-ksGrayTp -right-2.5"></span>
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
                            "rounded-md bg-backColor text-myText border-2 border-solid border-ksGrayTp hover:border-ksGreen h-10 min-w-32 text-base font-medium duration-200"
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
            <div className="flex gap-x-[76px] gap-y-8 flex-wrap">
              {ksData.map((box) => (
                <AgendaBox
                  key={box.id}
                  agendaImgUrl={box.img_url}
                  agendaTitle={box.title}
                  agendaDate={box.dat}
                  ksId={box.ks_id}
                  category={categories[activeCategoryId].urlName}
                  viewNum={box.number_of_views}
                />
              ))}
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
