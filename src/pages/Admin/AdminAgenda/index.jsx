import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import AgendaBox from "../../../components/AgendaBox";
import ErrorPage from "../../ErrorPage";
import AdminErrorPage from "../AdminErrorPage";
import AdminAgendaBox from "../AdminAgendaBox";

function AdminAgenda() {
  const { pathAdminCategory } = useParams();
  const { t } = useTranslation();
  const [activeAgendaCategoryId, setActiveAgendaCategoryId] = useState(0);
  const navigate = useNavigate();
  const [isAgenda, setIsAgenda] = useState(false);

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

  useEffect(() => {
    // db actions
    categories.forEach((category) => {
      category.urlName === pathAdminCategory &&
        setActiveAgendaCategoryId(category.id);
    });

    pathAdminCategory === "news" ||
    pathAdminCategory === "articles" ||
    pathAdminCategory === "announcements"
      ? setIsAgenda(true)
      : setIsAgenda(false);
  }, [pathAdminCategory]);

  return (
    <>
      {isAgenda ? (
        <div>
          <div className="flex gap-5 items-center h-12">
            <header className="text-xl font-medium relative">
              {t("otherCategories")}{" "}
              <div className="absolute -right-2.5 top-0 h-full bg-ksGrayTp w-0.5 rounded-full flex"></div>
            </header>
            <div className="flex gap-2.5 items-center">
              {categories.map(
                (category) =>
                  category.urlName !== pathAdminCategory && (
                    <button
                      onClick={() => navigate(`/admin/${category.urlName}`)}
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
          <header className="w-full h-16 text-2xl font-medium flex items-center justify-center rounded-sm bg-gradient-to-r to-green-950 from-green-950 via-[#189245] text-white mb-10">
            {categories[activeAgendaCategoryId].title}
          </header>
          <div className="flex flex-wrap justify-start gap-10">
            <AdminAgendaBox
              agendaTitle={"Hakan"}
              category={categories[activeAgendaCategoryId].urlName}
              id={"000000"}
            />
            <AgendaBox
              agendaTitle={"bahadır"}
              category={categories[activeAgendaCategoryId].urlName}
            />
            <AgendaBox
              agendaTitle={"bahadır"}
              category={categories[activeAgendaCategoryId].urlName}
            />
          </div>
        </div>
      ) : (
        <AdminErrorPage />
      )}
    </>
  );
}

export default AdminAgenda;
