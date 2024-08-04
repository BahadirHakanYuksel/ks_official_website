import { useEffect, useState } from "react";
import HomeTitle from "../../../components/HomeTitle";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../../consts";
import AgendaBox from "../../../components/AgendaBox";

function AgendaHome() {
  const [activeAgendaTitleId, setActiveAgendaTitleId] = useState(0);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ksData, setKsData] = useState([]);
  const [buttonsDisable, setButtonsDisable] = useState(false);

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
    setButtonsDisable(true);
    const formData = new FormData();
    formData.append("action", agendaTitles[activeAgendaTitleId].urlName);

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setButtonsDisable(false);
          console.log("kardeşiişiş : ", db);

          setKsData([db[0], db[1], db[2]]);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goAgendaMain = () => {
    const myUrl = `/agenda/${agendaTitles[activeAgendaTitleId].urlName}`;
    navigate(myUrl);
  };

  useEffect(() => {
    getDataOnDb();
    console.log(ksData);
  }, [activeAgendaTitleId]);

  return (
    <div className="flex flex-col gap-5">
      <HomeTitle>{t("EverythingOnTheAgenda")}</HomeTitle>
      <div className="flex justify-center h-10 items-center gap-5">
        <div className="h-7 flex items-center justify-center font-medium text-lg border-r-2 border-solid border-r-ksGreen px-2.5">
          {t("lastShared")}
        </div>
        {agendaTitles.map((agenda) => (
          <button
            disabled={buttonsDisable}
            onClick={() => {
              setActiveAgendaTitleId(agenda.id);
            }}
            key={agenda.id}
            className={classNames(
              "rounded-md bg-backColor text-myText border-2 border-solid border-transparent hover:border-ksGreen h-10 min-w-32 text-base font-medium opacity-70 hover:opacity-100 duration-200 disabled:pointer-events-none disabled:opacity-80",
              {
                "!bg-ksGreen !opacity-100 !text-white":
                  activeAgendaTitleId === agenda.id,
              }
            )}
          >
            {agenda.title}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {ksData.map(
          (agenda, index) =>
            index < 3 && (
              <AgendaBox
                agendaDate={agenda.lastDat}
                agendaImgUrl={agenda.img_url}
                agendaTitle={agenda.title}
                key={agenda.id}
                ksId={agenda.ks_id}
                category={agendaTitles[activeAgendaTitleId].urlName}
                viewNum={agenda.number_of_views}
              />
            )
        )}
      </div>
      <div className="flex items-center justify-center mt-5">
        <button
          onClick={goAgendaMain}
          className="bg-preKsBoxBack w-[200px] border-2 border-solid border-ksGray duration-200 hover:text-ksGreen hover:border-ksGreen h-10 rounded-full hover:bg-ksGray font-semibold"
        >
          {t("all")} {agendaTitles[activeAgendaTitleId].title}
        </button>
      </div>
    </div>
  );
}

export default AgendaHome;
