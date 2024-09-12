import React from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../../components/PageTitle";
import Supporter from "./Supporter";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import HomeTitle from "../../components/HomeTitle";
import { motion } from "framer-motion";

export default function Team({ type = "default" }) {
  const navigate = useNavigate();
  const team = [
    {
      nameAndSurname: "Bahadır Hakan Yüksel deneme deneme",
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
    {
      nameAndSurname: "Seyfettin Hocam",
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
    {
      nameAndSurname: "Seyfettin Hocam",
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
    {
      nameAndSurname: "Seyfettin Hocam",
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
    {
      nameAndSurname: "Seyfettin Hocam",
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-10"
    >
      {type === "default" && <PageTitle>Team</PageTitle>}
      {type === "home" && <HomeTitle>Team</HomeTitle>}

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
            className="bg-green-600 text-white border-2 border-solid border-ksGreen hover:bg-preKsBoxBack hover:text-myText font-medium text-lg duration-200 h-11 px-10 rounded-full"
          >
            Go to Team
          </button>
        </div>
      )}
    </motion.div>
  );
}
