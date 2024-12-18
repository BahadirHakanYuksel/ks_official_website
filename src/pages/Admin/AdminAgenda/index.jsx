import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import AdminErrorPage from "../AdminErrorPage";
import AdminAgendaBox from "../AdminAgendaBox";
import { motion } from "framer-motion";
import { openModalBoxHandle } from "../../../utils";
import { useResponsiveData } from "../../../Context";

function AdminAgenda() {
  const { pathAdminCategory } = useParams();
  const { t, i18n } = useTranslation();
  const [activeAgendaCategoryId, setActiveAgendaCategoryId] = useState(0);
  const { isMobile, isTablet } = useResponsiveData();
  const navigate = useNavigate();
  const [isAgenda, setIsAgenda] = useState(false);
  const [ksData, setKsData] = useState([]);
  const adminUrl = import.meta.env.VITE_ADMIN_URL;

  const categories = [
    {
      urlName: "news",
      title: t("news"),
      btnName:
        i18n.language === "en" ? "Publish New News" : "Yeni Haber Yayınla",
      dbKeyUrl: "H",
      id: 0,
    },
    {
      urlName: "articles",
      title: t("articles"),
      btnName:
        i18n.language === "en" ? "Publish New Article" : "Yeni Makale Yayınla",
      dbKeyUrl: "M",
      id: 1,
    },
    {
      urlName: "announcements",
      title: t("announcements"),
      btnName:
        i18n.language === "en"
          ? "Publish New Announcement"
          : "Yeni Duyuru Yayınla",
      dbKeyUrl: "D",
      id: 2,
    },
  ];

  const getDataOnDb = async () => {
    const formData = new FormData();
    formData.append("action", pathAdminCategory);

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setKsData(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // db actions
    categories.forEach((category) => {
      category.urlName === pathAdminCategory &&
        setActiveAgendaCategoryId(category.id);
    });

    pathAdminCategory === "news" ||
    pathAdminCategory === "articles" ||
    pathAdminCategory === "announcements"
      ? setIsAgenda(true)
      : setIsAgenda(false);

    getDataOnDb();
  }, [pathAdminCategory]);

  return (
    <>
      {isAgenda ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <header className="w-full h-16 text-3xl font-medium flex items-center justify-center rounded-sm bg-gradient-to-r to-green-950 from-green-950 via-[#189245] text-white mb-5">
            {categories[activeAgendaCategoryId].title}
          </header>
          <div
            className={classNames("flex gap-5 items-center h-12 mb-5", {
              "!flex-col !h-auto": isMobile,
            })}
          >
            <header className="text-xl font-medium relative">
              {t("otherCategories")}{" "}
              {!isMobile && (
                <div className="absolute -right-2.5 top-0 h-full bg-ksGrayTp w-0.5 rounded-full flex"></div>
              )}
            </header>
            <div className={classNames("flex gap-2.5 items-center")}>
              {categories.map(
                (category) =>
                  category.urlName !== pathAdminCategory && (
                    <button
                      onClick={() =>
                        navigate(`/admin-${adminUrl}/${category.urlName}`)
                      }
                      key={category.id}
                      className={classNames(
                        "rounded-md bg-backColor text-myText border-2 border-solid border-ksGrayTp hover:border-ksGreen h-10 min-w-32 text-base font-medium duration-200"
                      )}
                    >
                      {category.title}
                    </button>
                  )
              )}
            </div>
          </div>
          <div
            className={classNames(
              "flex flex-wrap justify-start gap-x-5 gap-y-10 mb-10",
              {
                "justify-between": isTablet,
              },
              {
                "!justify-center !gap-5": isMobile,
              }
            )}
          >
            <button
              onClick={() => {
                openModalBoxHandle({
                  operation: "add",
                  data: categories[activeAgendaCategoryId].dbKeyUrl,
                });
              }}
              className="agendaBoxHome h-[290.5px] w-80 bg-ksGreen rounded-lg shadow-xl p-3 flex flex-col gap-2.5 text-white text-2xl hover:bg-green-700 items-center justify-center font-medium transition-all hover:shadow-md relative overflow-hidden"
            >
              <i className="fa-solid fa-plus text-6xl"></i>
              <span>{categories[activeAgendaCategoryId].btnName}</span>
            </button>

            {ksData.map((box) => (
              <AdminAgendaBox
                agendaTitle={box.title}
                key={box.id}
                category={categories[activeAgendaCategoryId].urlName}
                agendaDate={box.dat}
                myData={box}
                id={box.ks_id}
                imgUrl={box.img_url}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <AdminErrorPage />
      )}
    </>
  );
}

export default AdminAgenda;
