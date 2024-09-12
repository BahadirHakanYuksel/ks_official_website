import React from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../../components/PageTitle";
import Supporter from "./Supporter";

export default function Team() {
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
    <div className="flex flex-col gap-10">
      <Helmet>
        <title>Team</title>
      </Helmet>
      <PageTitle>Team</PageTitle>
      <div className="page flex justify-center flex-wrap gap-x-10 gap-y-20 items-center">
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
    </div>
  );
}
