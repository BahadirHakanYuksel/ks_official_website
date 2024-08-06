import { useTranslation } from "react-i18next";
import AgendaContentSiderbarBox from "./AgendaContentSiderbarBox";
import { useEffect, useState } from "react";
import { useResponsiveData } from "../../../Context";
import classNames from "classnames";

function RightSidebar() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [articles, setArticles] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const { isMobile } = useResponsiveData();
  const agendaTitles = [
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

  const getDataOnDb = async () => {
    const formData = new FormData();
    formData.append("action", "news");

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setNews(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }

    formData.append("action", "articles");
    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setArticles(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }

    formData.append("action", "announcements");
    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setAnnouncements(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getDataOnDb();
  }, []);

  return (
    <div
      className={classNames("flex flex-col w-[25%] gap-10", {
        "!w-full": isMobile,
      })}
    >
      <div className="flex flex-col w-full gap-2.5">
        <header className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center">
          {agendaTitles[0].title}
        </header>
        {news.map(
          (agenda, i) =>
            i <= 2 && (
              <AgendaContentSiderbarBox
                title={agenda.title}
                key={agenda.id}
                date={agenda.dat}
                imgUrl={agenda.img_url}
                id={agenda.ks_id}
                category={agendaTitles[0].urlName}
                viewNum={agenda.number_of_views}
              />
            )
        )}
      </div>
      <div className="flex flex-col w-full gap-2.5">
        <header className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center">
          {agendaTitles[1].title}
        </header>
        {articles.map(
          (agenda, i) =>
            i <= 2 && (
              <AgendaContentSiderbarBox
                title={agenda.title}
                key={agenda.id}
                date={agenda.dat}
                imgUrl={agenda.img_url}
                id={agenda.ks_id}
                category={agendaTitles[0].urlName}
                viewNum={agenda.number_of_views}
              />
            )
        )}
      </div>
      <div className="flex flex-col w-full gap-2.5">
        <header className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center">
          {agendaTitles[2].title}
        </header>
        {announcements.map(
          (agenda, i) =>
            i <= 2 && (
              <AgendaContentSiderbarBox
                title={agenda.title}
                key={agenda.id}
                date={agenda.dat}
                imgUrl={agenda.img_url}
                id={agenda.ks_id}
                category={agendaTitles[0].urlName}
                viewNum={agenda.number_of_views}
              />
            )
        )}
      </div>
    </div>
  );
}

export default RightSidebar;
