import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useResponsiveData } from "../../Context";
import { motion } from "framer-motion";

function AgendaBox({
  agendaDate,
  agendaTitle,
  agendaImgUrl,
  category,
  ksId,
  viewNum,
}) {
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [myDate, setmyDate] = useState(agendaDate);

  const updateViewNumber = async () => {
    const formData = new FormData();
    formData.append("action", "updateAgendaNumberOfViews");
    formData.append("ks_id", ksId);
    formData.append("number_of_views", `${Number(viewNum) + 1}`);

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          // console.log(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goAgendaContentPage = () => {
    updateViewNumber();
    navigate(
      `/agenda/${category}/${encodeURIComponent(
        convertFromTextToUrl(agendaTitle)
      )}-${ksId}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={goAgendaContentPage}
      className={classNames(
        "agendaBoxHome h-[290.5px] w-80 bg-preKsBoxBack rounded-lg shadow-xl p-3 flex flex-col gap-2.5 hover:text-ksGreen transition-all hover:shadow-md relative overflow-hidden cursor-pointer",
        {
          "!w-[280px] !h-[265.5px]": isLaptop,
        },
        {
          "!w-[220px] !h-[235.5px]": isTablet,
        }
      )}
    >
      <div className="w-full bg-ksGrayTp overflow-hidden aspect-video rounded-lg flex items-center justify-center font-medium relative">
        <img
          className="w-full aspect-video"
          src={`https://katilimsigortacisi.com/img/${agendaImgUrl}`}
          alt=""
        />
        <p
          className={classNames(
            "absolute right-1 top-1 text-xs font-medium bg-preKsBoxBack text-titleColor px-2 h-5 flex items-center justify-center rounded-full",
            {
              "!text-[10px]": isLaptop,
            },
            {
              "!text-[9px]": isTablet,
            }
          )}
        >
          {`${myDate.split(" ")[0].split("-")[2]}.${
            myDate.split(" ")[0].split("-")[1]
          }.${myDate.split(" ")[0].split("-")[0]} `}
        </p>
        <div
          className={classNames(
            "agendaBoxHomeViews absolute right-1 bottom-1 w-12 bg-preKsBoxBack text-xs text-myText duration-200 rounded-full h-6 font-medium flex items-center justify-center gap-1 border-2 border-solid border-ksGrayTp shadow-md",
            {
              "!text-[10px] ": isLaptop,
            },
            {
              "!text-[9px] ": isTablet,
            }
          )}
        >
          <i
            className={classNames(
              "fa-solid fa-eye",
              {
                "!text-[8px]": isLaptop,
              },
              {
                "!text-[7px]": isTablet,
              }
            )}
          ></i>
          <span
            className={classNames(
              "flex items-center h-full text-myText",
              {
                "!text-[10px] ": isLaptop,
              },
              {
                "!text-[9px] ": isTablet,
              }
            )}
          >
            {viewNum.toString().length >= 4 &&
              viewNum.toString().length < 7 &&
              viewNum.toString().slice(0, -3) + " B"}
            {viewNum.toString().length >= 7 &&
              viewNum.toString().slice(0, -6) + " M"}
            {viewNum.toString().length < 4 && viewNum}
          </span>
        </div>
      </div>
      <header
        className={classNames(
          "text-start text-base mb-2.5 h-12 font-medium line-clamp-2",
          {
            "!text-sm": isTablet,
          }
        )}
      >
        {agendaTitle
          .split(" ")
          .map((word) => word.charAt(0).toLocaleUpperCase("tr") + word.slice(1))
          .join(" ")}
      </header>
      <button
        className={classNames(
          "agendaBoxButton absolute -bottom-12 left-1/2 -translate-x-1/2 h-8 w-full text-myText rounded-full bg-ksGrayTp font-medium text-sm duration-200",
          {
            "!text-[13px] !h-7": isLaptop,
          }
        )}
      >
        {t("read")}
      </button>
      <div className="absolute text-xs agendaBoxMarkName opacity-100 duration-200 bottom-3 left-1/2 -translate-x-1/2 w-full bg-ksGrayTp h-1.5 rounded-full"></div>
    </motion.div>
  );
}

export default AgendaBox;
