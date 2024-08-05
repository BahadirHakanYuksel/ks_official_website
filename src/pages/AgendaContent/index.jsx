import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import { motion } from "framer-motion";
import classNames from "classnames";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

function AgendaContent() {
  const parseContent = (content) => {
    const parts = content.split(
      /(\*\*.*?\*\*|###.*?###|##.*?##|#.*?#|--.*?--|\[.*?\]\(.*?\)|\* .+?(?:\n|$))/
    );

    return parts.map((part, index) => {
      if (part.startsWith("** ") && part.endsWith(" **")) {
        return (
          <strong className="!font-bold text-green-500" key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("### ") && part.endsWith(" ###")) {
        return (
          <div className="flex justify-start items-center">
            <header
              className={classNames("!text-4xl relative", {})}
              key={index}
            >
              {part.slice(3, -3)}
              <div className="absolute h-1 -bottom-2 w-full rounded-full bg-green-600"></div>
            </header>
          </div>
        );
      } else if (part.startsWith("## ") && part.endsWith(" ##")) {
        return (
          <div className="flex justify-start items-center">
            <header
              className={classNames("!text-3xl relative", {})}
              key={index}
            >
              {part.slice(2, -2)}
              <div className="absolute h-1 -bottom-2 w-full rounded-full bg-green-600"></div>
            </header>
          </div>
        );
      } else if (part.startsWith("# ") && part.endsWith(" #")) {
        return (
          <div className="flex justify-start items-center">
            <header
              className={classNames("!text-2xl relative", {})}
              key={index}
            >
              {part.slice(1, -1)}
              <div className="absolute h-1 -bottom-2 w-full rounded-full bg-green-600"></div>
            </header>
          </div>
        );
      } else if (
        part.startsWith("[") &&
        part.includes("](") &&
        part.endsWith(")")
      ) {
        const text = part.slice(1, part.indexOf("]"));
        const url = part.slice(part.indexOf("(") + 1, -1);
        return (
          <a
            className="hover:underline cursor-pointer text-green-400 font-bold"
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        );
      } else if (part.startsWith("-- ") && part.endsWith(" --")) {
        return (
          <span key={index} className="text-green-500">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part.startsWith("* ")) {
        return (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            <span>{part.slice(2).trim()}</span>
          </div>
        );
      }
      return part;
    });
  };
  const { pathAgendaInfo } = useParams();
  const path = useLocation().pathname;

  const { t } = useTranslation();

  const [ksContentData, setKsContentData] = useState([]);
  const [paragraph, setParagraph] = useState([]);

  const [dates, setDates] = useState({
    loadDate: "",
    uploadDate: "",
  });

  const getContentOnDb = async () => {
    const formData = new FormData();

    const myID = `${
      pathAgendaInfo.split("-")[pathAgendaInfo.split("-").length - 1]
    }`;

    formData.append("ks_id", myID);

    formData.append("action", "id_case");

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((contentData) => {
          setKsContentData(contentData[0]);
          setDates({
            loadDate: `${contentData[0].lastDat.split(" ")[0].split("-")[2]}.${
              contentData[0].lastDat.split(" ")[0].split("-")[1]
            }.${contentData[0].lastDat.split(" ")[0].split("-")[0]} - ${
              contentData[0].lastDat.split(" ")[1].split(":")[0]
            }.${contentData[0].lastDat.split(" ")[1].split(":")[1]}`,
            uploadDate: `${
              contentData[0].lastDat.split(" ")[0].split("-")[2]
            }.${contentData[0].lastDat.split(" ")[0].split("-")[1]}.${
              contentData[0].lastDat.split(" ")[0].split("-")[0]
            } - ${contentData[0].lastDat.split(" ")[1].split(":")[0]}.${
              contentData[0].lastDat.split(" ")[1].split(":")[1]
            }`,
          });
          setParagraph(contentData[0].dsc.split("\n"));
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
    getContentOnDb();
    // const date = new Date();
    // const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
    // console.log(formattedDate);
  }, [pathAgendaInfo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page flex gap-10"
    >
      <div className="w-[75%] flex flex-col gap-2.5">
        <header className="text-3xl font-medium text-myText">
          {ksContentData.title}
        </header>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5 text-sm">
            <p className="flex gap-1.5">
              <header className=" font-medium text-titleColor">
                {t("publicationDate")}
              </header>
              : {dates.loadDate}
            </p>
            <p className="flex gap-1.5">
              <header className="font-medium text-titleColor">
                {t("lastUpdateDate")}
              </header>
              : {dates.uploadDate}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-0.5 text-sm">
            <header className="font-medium bg-ksGrayTp w-20 flex items-center justify-center rounded-sm text-myText">
              {t("author")}
            </header>
            {ksContentData.writer}
          </div>
        </div>
        <div className="w-full aspect-video border-2 border-solid border-ksGrayTp rounded-md overflow-hidden">
          <img
            src={`https://katilimsigortacisi.com/img/${ksContentData.img_url}`}
            className="w-full aspect-video"
            alt=""
          />
        </div>
        <div className="flex items-center justify-between h-8">
          <div className="flex gap-2 h-full items-center">
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://katilimsigortacisi.com${path}`
                )
              }
              className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-sm hover:text-ksGreen duration-200 border-2 border-solid border-ksGrayTp hover:border-ksGreen"
            >
              <i className="fa-solid fa-share-nodes"></i>
              <span>{t("share")}</span>
            </button>
            {ksContentData.link !== "" && (
              <a
                href={ksContentData.link}
                target="_blank"
                className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-sm hover:text-ksGreen duration-200 border-2 border-solid border-ksGrayTp hover:border-ksGreen"
              >
                <i className="fa-solid fa-play"></i>
                <span>{t("watch")}</span>
              </a>
            )}
          </div>
          <div className="flex gap-2 h-full items-center">
            {/* like and dislike  */}
            {/* <label className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-16 rounded-full hover:text-ksGreen duration-80 border-2 border-solid border-ksGrayTp hover:border-ksGreen duration-200 cursor-pointer">
              <i class="fa-regular fa-thumbs-up"></i>
              <span>0</span>
            </label>
            <label className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-16 rounded-full hover:text-ksGreen duration-80 border-2 border-solid border-ksGrayTp hover:border-ksGreen duration-200 cursor-pointer">
              <i class="fa-regular fa-thumbs-down"></i>
              <span>0</span>
            </label> */}
            <div
              title="Görüntülenme Sayısı"
              className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-full duration-200 border-2 border-solid border-ksGrayTp select-none"
            >
              <i className="fa-solid fa-eye"></i>
              <span>{ksContentData.number_of_views}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 mt-5">
          {paragraph.map((row, i) => (
            <div key={i}>{parseContent(row)}</div>
          ))}
        </div>
      </div>
      <RightSidebar />
    </motion.div>
  );
}

export default AgendaContent;
