import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../consts";
import { useEffect, useState } from "react";

function AgendaBox({
  agendaDate,
  agendaTitle,
  agendaImgUrl,
  category,
  ksId,
  viewNum,
}) {
  const { t } = useTranslation();
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
          console.log(db);
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

  useEffect(() => {
    const editDate = agendaDate.split("-");
    console.log(editDate);
    setmyDate(`${editDate[2]}.${editDate[1]}.${editDate[0]}`);
  }, []);

  return (
    <button
      onClick={goAgendaContentPage}
      className="agendaBoxHome h-[290.5px] w-80 bg-preKsBoxBack rounded-lg shadow-xl p-3 flex flex-col gap-2.5 hover:text-ksGreen transition-all hover:shadow-md relative overflow-hidden"
    >
      <div className="w-full bg-ksGrayTp overflow-hidden aspect-video rounded-lg flex items-center justify-center font-medium relative">
        <img
          className="w-full aspect-video"
          src={`https://katilimsigortacisi.com/img/${agendaImgUrl}`}
          alt=""
        />
        <p className="absolute right-1 top-1 text-xs font-medium bg-preKsBoxBack px-2 h-5 flex items-center justify-center rounded-full">
          {myDate}
        </p>
      </div>
      <header className="text-start text-base mb-2.5 h-12 font-medium line-clamp-2">
        {agendaTitle}
      </header>
      <button className="agendaBoxButton absolute -bottom-12 left-1/2 -translate-x-1/2 h-8 w-full text-myText rounded-full bg-ksGrayTp font-medium text-sm duration-200">
        {t("read")}
      </button>
      <div className="absolute text-xs agendaBoxMarkName opacity-100 duration-200 bottom-3 left-1/2 -translate-x-1/2 w-full bg-ksGrayTp h-1.5 rounded-full"></div>
    </button>
  );
}

export default AgendaBox;
