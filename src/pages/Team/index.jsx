import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../../components/PageTitle";
import Supporter from "./Supporter";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import HomeTitle from "../../components/HomeTitle";
import { motion } from "framer-motion";
import { useResponsiveData } from "../../Context";
import { useTranslation } from "react-i18next";

export default function Team({ type = "default" }) {
  const navigate = useNavigate();

  const { isTablet } = useResponsiveData();
  const { t } = useTranslation();

  const [counsellors, setCounsellors] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCounsellors = async () => {
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const ks_team = import.meta.env.VITE_REQUEST_GET_TEAM;
    const formData = new FormData();
    formData.append("action", ks_team);
    setLoading(true);
    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setLoading(false);
          setCounsellors(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCounsellors();
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <>
      {counsellors.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={classNames("flex flex-col gap-10", {
            "!min-h-screen": type !== "home",
          })}
        >
          {type === "default" && <PageTitle>{t("team")}</PageTitle>}
          {type === "home" && <HomeTitle>{t("team")}</HomeTitle>}
          {type === "home" &&
            (loading ? (
              <div className="w-full flex items-center justify-center h-[300px] bg-black bg-opacity-40 text-white font-medium text-3xl">
                {t("loading")}
              </div>
            ) : (
              <div
                className={classNames(
                  "flex justify-center flex-wrap gap-x-10 gap-y-20 items-center page",
                  {
                    "!p-0 !mt-10": type === "home",
                  }
                )}
              >
                {counsellors.map(
                  (counsellor, i) =>
                    i < 3 && (
                      <Supporter
                        key={i}
                        id={counsellor.counsellor_id}
                        img_url={counsellor.counsellor_img_url}
                        name={counsellor.counsellor_name}
                        surname={counsellor.counsellor_surname}
                        description={counsellor.counsellor_dsc}
                        social_links={
                          counsellor.counsellor_links !== null
                            ? JSON.parse(counsellor.counsellor_links)
                            : []
                        }
                      />
                    )
                )}
              </div>
            ))}
          {type === "default" &&
            (loading ? (
              <div className="w-full flex items-center justify-center h-[300px] bg-black bg-opacity-40 text-white font-medium text-3xl">
                {t("loading")}
              </div>
            ) : (
              <div
                className={classNames(
                  "flex justify-center flex-wrap gap-x-10 gap-y-20 items-center mt-5 page",
                  {
                    "!p-0 !mt-10": type === "home",
                  }
                )}
              >
                {counsellors.map((counsellor, i) => (
                  <Supporter
                    key={i}
                    id={counsellor.counsellor_id}
                    img_url={counsellor.counsellor_img_url}
                    name={counsellor.counsellor_name}
                    surname={counsellor.counsellor_surname}
                    description={counsellor.counsellor_dsc}
                    social_links={
                      counsellor.counsellor_links !== null
                        ? JSON.parse(counsellor.counsellor_links)
                        : []
                    }
                  />
                ))}
              </div>
            ))}
          {type === "home" && (
            <div className="flex items-center justify-center">
              <button
                onClick={() => navigate("/team")}
                className={classNames(
                  "bg-preKsBoxBack w-[200px] border-2 border-solid border-agendaHomeAllAgendaButtonBorder duration-200 hover:text-ksGreen hover:border-ksGreen h-12 rounded-full hover:bg-backColor font-semibold",
                  {
                    "!w-[150px] !text-base !h-9": isTablet,
                  }
                )}
              >
                {t("goToTeam")}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
