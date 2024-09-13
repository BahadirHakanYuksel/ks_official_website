import React, { useEffect } from "react";
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
  const team = [
    {
      nameAndSurname: "Seyfettin KURT",
      description: "Bu bir açıklama yazısıdır.",
      img_url: false,
      social_links: [
        {
          name: "x",
          link: false,
        },
        {
          name: "instagram",
          link: " ",
        },
        {
          name: "facebook",
          link: false,
        },
        {
          name: "youtube",
          link: false,
        },
      ],
    },
    {
      nameAndSurname: "Bahadır Hakan Yüksel",
      description: "Bu bir açıklama yazısıdır.",
      img_url: false,
      social_links: [
        {
          name: "x-twitter",
          link: " ",
        },
        {
          name: "instagram",
          link: false,
        },
        {
          name: "facebook",
          link: false,
        },
        {
          name: "youtube",
          link: false,
        },
      ],
    },
    {
      nameAndSurname: "Seyfettin KURT",
      description: "Bu bir açıklama yazısıdır.",
      img_url: false,
      social_links: [
        {
          name: "x",
          link: false,
        },
        {
          name: "instagram",
          link: false,
        },
        {
          name: "facebook",
          link: " ",
        },
        {
          name: "youtube",
          link: false,
        },
      ],
    },
    {
      nameAndSurname: "Seyfettin KURT",
      description: "Bu bir açıklama yazısıdır.",
      img_url: false,
      social_links: [
        {
          name: "x",
          link: false,
        },
        {
          name: "instagram",
          link: false,
        },
        {
          name: "facebook",
          link: false,
        },
        {
          name: "youtube",
          link: " ",
        },
      ],
    },
    {
      nameAndSurname: "Seyfettin KURT",
      description: "Bu bir açıklama yazısıdır.",
      img_url: false,
      social_links: [
        {
          name: "x",
          link: false,
        },
        {
          name: "instagram",
          link: false,
        },
        {
          name: "facebook",
          link: false,
        },
        {
          name: "youtube",
          link: false,
        },
      ],
    },
  ];

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-10"
    >
      {type === "default" && <PageTitle>{t("team")}</PageTitle>}
      {type === "home" && <HomeTitle>{t("team")}</HomeTitle>}
      {type === "home" && (
        <div
          className={classNames(
            "flex justify-center flex-wrap gap-x-10 gap-y-20 items-center page",
            {
              "!p-0 !mt-10": type === "home",
            }
          )}
        >
          {team.map(
            (spt, i) =>
              i < 3 && (
                <Supporter
                  key={i}
                  name_and_surname={spt.nameAndSurname}
                  img_url={spt.img_url}
                  social_links={spt.social_links}
                  description={spt.description}
                />
              )
          )}
        </div>
      )}
      {type === "default" && (
        <div
          className={classNames(
            "flex justify-center flex-wrap gap-x-10 gap-y-20 items-center mt-5 page",
            {
              "!p-0 !mt-10": type === "home",
            }
          )}
        >
          {team.map((spt, i) => (
            <Supporter
              key={i}
              name_and_surname={spt.nameAndSurname}
              img_url={spt.img_url}
              social_links={spt.social_links}
              description={spt.description}
            />
          ))}
        </div>
      )}
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
  );
}
