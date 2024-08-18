import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../Context";
import { Helmet } from "react-helmet-async";
import ErrorPage from "../ErrorPage";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

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
              className={classNames("!text-2xl font-medium relative", {})}
              key={index}
            >
              {part.slice(1, -1)}
              {/* <div className="absolute h-1 -bottom-2 w-full rounded-full bg-green-600"></div> */}
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
  const { pathAgendaInfo, pathAgendaCategory } = useParams();
  const path = useLocation().pathname;
  const { isMobile } = useResponsiveData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [ksContentData, setKsContentData] = useState([]);
  const [viewOk, setViewOk] = useState(false);
  const [paragraph, setParagraph] = useState([]);

  const [dates, setDates] = useState({
    loadDate: "",
    uploadDate: "",
  });

  const getContentOnDb = async () => {
    setLoading(true);

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
          contentData.forEach((db) => {
            if (db.ks_id === myID) {
              setKsContentData(db);
              setDates({
                loadDate: `${db.dat.split(" ")[0].split("-")[2]}.${
                  db.dat.split(" ")[0].split("-")[1]
                }.${db.dat.split(" ")[0].split("-")[0]} - ${
                  db.dat.split(" ")[1].split(":")[0]
                }.${db.dat.split(" ")[1].split(":")[1]}`,
                uploadDate: `${db.lastDat.split(" ")[0].split("-")[2]}.${
                  db.lastDat.split(" ")[0].split("-")[1]
                }.${db.lastDat.split(" ")[0].split("-")[0]} - ${
                  db.lastDat.split(" ")[1].split(":")[0]
                }.${db.lastDat.split(" ")[1].split(":")[1]}`,
              });
              setParagraph(db.dsc.split("\n"));

              setLoading(false);
            }
          });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
    getContentOnDb();
  }, [pathAgendaInfo]);

  const [showMenu, setShowMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://katilimsigortacisi.com${path}`);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  const closeSharingMenu = () => {
    setShowMenu(false);
    setLinkCopied(false);
  };

  return (
    <>
      {ksContentData ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={classNames("page flex gap-10 relative", {
            "!flex-col": isMobile,
          })}
        >
          <Helmet>
            <title>{ksContentData.title}</title>
          </Helmet>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                onClick={(e) => {
                  e.target.id === "shareButtonsMain" && closeSharingMenu();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full z-50 flex items-center justify-center"
                id="shareButtonsMain"
              >
                <div className="flex flex-col gap-10 w-[400px] h-auto bg-backColor rounded-lg shadow-lg pt-10 p-3 relative">
                  <button
                    onClick={closeSharingMenu}
                    type="button"
                    className="absolute w-10 h-7 hover:bg-black hover:text-white duration-200 right-3 top-3 flex items-center justify-center rounded-lg bg-preKsBoxBack shadow-lg border-2 border-solid border-ksGrayTp"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <div className="flex justify-center">
                    <header className="text-titleColor font-medium text-4xl relative">
                      {t("share")}
                      <div className="absolute w-[60%] h-1 left-1/2 -translate-x-1/2 -bottom-3.5 rounded-full bg-ksGreen"></div>
                    </header>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    <FacebookShareButton
                      className="hover:scale-105 duration-200 rounded-full"
                      url={`https://katilimsigortacisi.com${path}`}
                    >
                      <FacebookIcon size={48} round />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      className="hover:scale-105 duration-200 rounded-full"
                      url={`https://katilimsigortacisi.com${path}`}
                    >
                      <WhatsappIcon size={48} round />
                    </WhatsappShareButton>
                    <TwitterShareButton
                      className="hover:scale-105 duration-200 rounded-full w-12 h-12 bg-black"
                      url={`https://katilimsigortacisi.com${path}`}
                    >
                      <i className="fa-brands fa-x-twitter text-2xl bg-black text-white w-12 h-12 flex items-center justify-center pointer-events-none rounded-full"></i>
                    </TwitterShareButton>
                    <TelegramShareButton
                      className="hover:scale-105 duration-200 rounded-full"
                      url={`https://katilimsigortacisi.com${path}`}
                    >
                      <TelegramIcon size={48} round />
                    </TelegramShareButton>
                    <RedditShareButton
                      className="hover:scale-105 duration-200 rounded-full"
                      url={`https://katilimsigortacisi.com${path}`}
                    >
                      <RedditIcon size={48} round />
                    </RedditShareButton>
                    <LinkedinShareButton
                      className="hover:scale-105 duration-200 rounded-full"
                      url={`https://katilimsigortacisi.com${path}`}
                    >
                      <LinkedinIcon size={48} round />
                    </LinkedinShareButton>
                  </div>
                  <div className="relative">
                    <input
                      disabled
                      type="text"
                      value={`https://katilimsigortacisi.com${path}`}
                      className={classNames(
                        "h-14 w-full rounded-md px-3 pr-28 text-base font-medium text-messageBoxInputBack bg-backColor disabled:pointer-events-none border-2 border-solid border-gray-400 focus:border-ksGreen duration-200"
                      )}
                    />
                    <button
                      onClick={copyLink}
                      className={classNames(
                        "absolute right-3 top-1/2 -translate-y-1/2 bg-ksGreen w-24 h-10 rounded-md text-sm font-medium text-white active:bg-green-700 hover:bg-green-600 duration-200",
                        {
                          "!bg-blue-500 !pointer-events-none !opacity-80":
                            linkCopied,
                        }
                      )}
                    >
                      {linkCopied ? t("copied") : t("copy")}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className={classNames("w-[75%] flex flex-col gap-2.5", {
              "!w-full": isMobile,
            })}
          >
            <header
              className={classNames("text-3xl font-medium text-myText", {
                "!text-2xl": isMobile,
                "!h-9 !bg-ksGrayTp !rounded-md": loading,
              })}
            >
              {ksContentData.title}
            </header>
            <div className="flex flex-col">
              <div
                className={classNames("flex flex-col gap-0.5 text-sm", {
                  "!text-xs": isMobile,
                })}
              >
                <p className={classNames("flex gap-1.5")}>
                  <header className=" font-medium text-titleColor">
                    {t("category")}
                  </header>
                  :{" "}
                  <button
                    className="hover:text-ksGreen"
                    onClick={() => navigate(`/agenda/${pathAgendaCategory}`)}
                  >
                    {ksContentData.grup === "H" && t("news")}
                    {ksContentData.grup === "M" && t("articles")}
                    {ksContentData.grup === "D" && t("announcements")}
                  </button>
                </p>
                <p className={classNames("flex gap-1.5")}>
                  <header className=" font-medium text-titleColor">
                    {t("publicationDate")}
                  </header>
                  : {dates.loadDate}
                </p>
                <p className={classNames("flex gap-1.5")}>
                  <header className="font-medium text-titleColor">
                    {t("lastUpdateDate")}
                  </header>
                  : {dates.uploadDate}
                </p>
                <p className={classNames("flex gap-1.5")}>
                  <header className=" font-medium text-titleColor">
                    {t("author")}
                  </header>
                  : {ksContentData.writer}
                </p>
              </div>
              {/* <div
            className={classNames(
              "flex flex-col justify-center items-center gap-0.5 text-sm",
              {
                "!text-xs": isMobile,
              }
            )}
          >
            <header
              className={classNames(
                "font-medium bg-ksGrayTp w-20 flex items-center justify-center rounded-sm text-myText",
                {
                  "!w-14": isMobile,
                }
              )}
            >
              {}
            </header>
            
          </div> */}
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
                  onClick={toggleMenu}
                  className={classNames(
                    "flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-sm hover:text-ksGreen duration-200 border-2 border-solid border-ksGrayTp hover:border-ksGreen",
                    {
                      "!text-xs !w-[70px]": isMobile,
                    }
                  )}
                >
                  <i className="fa-solid fa-share-nodes"></i>
                  <span>{t("share")}</span>
                </button>
                {ksContentData.link !== "" && (
                  <a
                    href={ksContentData.link}
                    target="_blank"
                    className={classNames(
                      "flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-sm hover:text-ksGreen duration-200 border-2 border-solid border-ksGrayTp hover:border-ksGreen",
                      {
                        "!text-xs !w-[70px]": isMobile,
                      }
                    )}
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
                  className={classNames(
                    "flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-full duration-200 border-2 border-solid border-ksGrayTp select-none",
                    {
                      "!w-16 !text-xs": isMobile,
                    }
                  )}
                >
                  <i className="fa-solid fa-eye"></i>
                  <span>{ksContentData.number_of_views}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-5">
              {paragraph.map((row, i) => (
                <div
                  className={classNames("text-base", {
                    "!text-sm": isMobile,
                  })}
                  key={i}
                >
                  {parseContent(row)}
                </div>
              ))}
            </div>
          </div>
          <RightSidebar />
        </motion.div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default AgendaContent;
