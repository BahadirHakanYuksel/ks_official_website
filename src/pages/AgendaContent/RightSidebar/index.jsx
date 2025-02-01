import { useTranslation } from "react-i18next";
import AgendaContentSiderbarBox from "./AgendaContentSiderbarBox";
import { useEffect, useState } from "react";
import { useResponsiveData } from "../../../Context";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateRightSidebarGetRequestHandle } from "../../../utils";

function RightSidebar() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [articles, setArticles] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const { isMobile } = useResponsiveData();
  const navigate = useNavigate();
  const { pathAgendaInfo } = useParams();
  const { rightSidebarGetRequest } = useSelector((state) => state.app);
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
  const myID = `${
    pathAgendaInfo.split("-")[pathAgendaInfo.split("-").length - 1]
  }`;
  const [loading, setLoading] = useState(false);

  const getDataOnDb = async () => {
    setLoading(true);
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const neli = import.meta.env.VITE_REQUEST_AGENDA_NEWS_LIMIT;
    const arli = import.meta.env.VITE_REQUEST_AGENDA_ARTICLES_LIMIT;
    const anli = import.meta.env.VITE_REQUEST_AGENDA_ANNOUNCEMENTS_LIMIT;

    const formData = new FormData();
    formData.append("action", neli);

    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          db.length === 0 ? setNews(false) : setNews(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }

    formData.append("action", arli);
    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          db.length === 0 ? setArticles(false) : setArticles(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }

    formData.append("action", anli);
    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          db.length === 0 ? setAnnouncements(false) : setAnnouncements(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const firstLoadingPage = async () => {
    await getDataOnDb();
    setLoading(false);
    updateRightSidebarGetRequestHandle(false);
  };

  useEffect(() => {
    firstLoadingPage();
  }, [rightSidebarGetRequest]);

  return (
    <div
      className={classNames("flex flex-col w-[30%] gap-14", {
        "!w-full": isMobile,
      })}
    >
      {news && (
        <div className="flex flex-col w-full gap-2.5">
          <button
            onClick={() => navigate(`/agenda/${agendaTitles[0].urlName}`)}
            className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center hover:bg-green-600 duration-200"
          >
            {agendaTitles[0].title}
          </button>
          {loading && (
            <>
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
            </>
          )}
          {news.map(
            (agenda, i) =>
              i <= 2 &&
              agenda.ks_id !== myID && (
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
      )}
      {articles && (
        <div className="flex flex-col w-full gap-2.5">
          <button
            onClick={() => navigate(`/agenda/${agendaTitles[1].urlName}`)}
            className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center hover:bg-green-600 duration-200"
          >
            {agendaTitles[1].title}
          </button>
          {loading && (
            <>
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
            </>
          )}
          {articles.map(
            (agenda, i) =>
              i <= 2 &&
              agenda.ks_id !== myID && (
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
      )}
      {announcements && (
        <div className="flex flex-col w-full gap-2.5">
          <button
            onClick={() => navigate(`/agenda/${agendaTitles[2].urlName}`)}
            className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center hover:bg-green-600 duration-200"
          >
            {agendaTitles[2].title}
          </button>
          {loading && (
            <>
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
              <AgendaContentSiderbarBox
                title={"..."}
                viewNum={0}
                date={"00.00.0000"}
              />
            </>
          )}
          {announcements.map(
            (agenda, i) =>
              i <= 2 &&
              agenda.ks_id !== myID && (
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
      )}
    </div>
  );
}

export default RightSidebar;
