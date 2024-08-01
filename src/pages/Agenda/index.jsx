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
  const navigate = useNavigate();

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
    let pageControlCounter = 0;
    categories.forEach((category) => {
      convertFromTextToUrl(category.urlName) === pathAgendaCategory
        ? setactiveCategoryId(category.id)
        : pageControlCounter++;

      console.log(category);
    });
    pageControlCounter === 3
      ? setThisPageIsAgenda(false)
      : setThisPageIsAgenda(true);
  }, [pathAgendaCategory]);

  const categories = [
    {
      urlName: "news",
      title: t("news"),
      dbKeyUrl: "",
      id: 0,
    },
    {
      urlName: "articles",
      title: t("articles"),
      dbKeyUrl: "",
      id: 1,
    },
    {
      urlName: "announcements",
      title: t("announcements"),
      dbKeyUrl: "",
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
              <AgendaBox
                agendaTitle={
                  "Başlık deneme birden fazla kelime vs vsbunun bir sonu yokmu ulenn"
                }
                agendaDate={"01/08/2024"}
                category={categories[activeCategoryId].urlName}
              />
              <AgendaBox
                agendaTitle={
                  "Başlık deneme birden fazla kelime vs vsbunun bir sonu yokmu ulenn"
                }
                agendaDate={"01/08/2024"}
                category={categories[activeCategoryId].urlName}
              />
              <AgendaBox
                agendaTitle={
                  "Başlık deneme birden fazla kelime vs vsbunun bir sonu yokmu ulenn"
                }
                agendaDate={"01/08/2024"}
                category={categories[activeCategoryId].urlName}
              />
              <AgendaBox
                agendaTitle={"Deneme"}
                agendaDate={"01/08/2024"}
                category={categories[activeCategoryId].urlName}
              />
              <AgendaBox
                agendaTitle={
                  "Başlık deneme birden fazla kelime vs vsbunun bir sonu yokmu ulenn"
                }
                agendaDate={"01/08/2024"}
                category={categories[activeCategoryId].urlName}
              />
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
