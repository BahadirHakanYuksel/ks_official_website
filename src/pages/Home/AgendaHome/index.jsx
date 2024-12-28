import { useEffect, useState } from "react";
import HomeTitle from "../../../components/HomeTitle";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../../consts";
import AgendaBox from "../../../components/AgendaBox";
import { useResponsiveData } from "../../../Context";
import { motion } from "framer-motion";

function AgendaHome() {
  const [activeAgendaTitleId, setActiveAgendaTitleId] = useState(0);
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
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
    formData.append(
      "action",
      `${agendaTitles[activeAgendaTitleId].urlName}-limit`
    );

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          if (db.length === 0) setKsData(false);
          else setKsData(db);
          setButtonsDisable(false);
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
  }, [activeAgendaTitleId]);

  return (
    <div
      className={classNames("flex flex-col gap-5", {
        "!gap-2.5": isMobile,
      })}
    >
      <HomeTitle>{t("EverythingOnTheAgenda")}</HomeTitle>
      <div
        className={classNames("flex justify-center h-10 items-center gap-5", {
          "!gap-2 !flex-col !h-auto": isMobile,
        })}
      >
        <header
          className={classNames(
            "h-7 flex items-center justify-center font-medium text-lg border-r-2 border-solid border-r-ksGreen px-2.5",
            {
              "!text-base": isTablet,
            },

            {
              "!text-sm !h-8 !px-0 !pr-1 !border-0 !border-b-2 !border-b-ksGreen":
                isMobile,
            }
          )}
        >
          {t("lastShared")}
        </header>
        <div className="flex gap-2.5">
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
                },
                {
                  "!min-w-28 !h-9 !text-[15px]": isTablet,
                },
                {
                  "!min-w-[85px] !h-[35px] !text-[11px]": isMobile,
                }
              )}
            >
              {agenda.title}
            </button>
          ))}
        </div>
      </div>
      <div
        className={classNames("flex flex-wrap justify-center gap-10", {
          "!gap-7": isLaptop,
          "!flex !justify-center !items-center": isTablet,
        })}
      >
        {ksData ? (
          ksData.map(
            (agenda, index) =>
              index < 3 && (
                <AgendaBox
                  agendaDate={agenda.dat}
                  agendaImgUrl={agenda.img_url}
                  agendaTitle={agenda.title}
                  key={agenda.id}
                  ksId={agenda.ks_id}
                  category={agendaTitles[activeAgendaTitleId].urlName}
                  viewNum={agenda.number_of_views}
                />
              )
          )
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
            {t("current")} {agendaTitles[activeAgendaTitleId].title}{" "}
            {t("comingSoon")}
          </motion.div>
        )}
      </div>
      {ksData && (
        <div className="flex items-center justify-center mt-5">
          <button
            onClick={goAgendaMain}
            className={classNames(
              "bg-preKsBoxBack w-[200px] border-2 border-solid border-agendaHomeAllAgendaButtonBorder duration-200 hover:text-ksGreen hover:border-ksGreen h-12 rounded-full hover:bg-backColor font-semibold",
              {
                "!w-[150px] !text-base !h-9": isTablet,
              }
            )}
          >
            {t("all")} {agendaTitles[activeAgendaTitleId].title}
          </button>
        </div>
      )}
    </div>
  );
}

export default AgendaHome;
