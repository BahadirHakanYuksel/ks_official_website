import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../../../consts";
import { useEffect, useState } from "react";
import { updateRightSidebarGetRequestHandle } from "../../../../utils";
import { motion } from "framer-motion";
import classNames from "classnames";

function AgendaContentSiderbarBox({
  date,
  title,
  imgUrl,
  category,
  id,
  viewNum,
}) {
  const navigate = useNavigate();
  const [lastUpload, setLastUpload] = useState();
  const [numberOfView, setNumberOfView] = useState(viewNum);
  const [FormatedDate, setFormatedDate] = useState("");
  const [agendaTitle, setAgendaTitle] = useState(undefined);

  useEffect(() => {
    const formatted = `${date.split(" ")[0].split("-")[2]}.${
      date.split(" ")[0].split("-")[1]
    }.${date.split(" ")[0].split("-")[0]}`;
    setFormatedDate(formatted);

    setAgendaTitle(
      title
        .split(" ")
        .map((word) => word.charAt(0).toLocaleUpperCase("tr") + word.slice(1))
        .join(" ")
    );
  }, []);

  const updateViewNumber = async () => {
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const agenda_now = import.meta.env.VITE_REQUEST_AGENDA_NOW;

    const formData = new FormData();
    formData.append("action", agenda_now);
    formData.append("ks_id", id);
    formData.append("number_of_views", `${Number(viewNum) + 1}`);

    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          if (db.status === "success") {
            setNumberOfView(Number(viewNum) + 1);
            updateRightSidebarGetRequestHandle(true);
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goOtherAgenda = async () => {
    await updateViewNumber();
    navigate(`/agenda/${category}/${convertFromTextToUrl(title)}-${id}`);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      onClick={() => goOtherAgenda()}
      className={classNames(
        "agendaContentSiderbarBox flex w-full bg-preKsBoxBack overflow-hidden p-2 gap-2 shadow-lg relative rounded-sm",
        {
          "!pointer-events-none": date === "00.00.0000",
        }
      )}
    >
      <section className="w-full flex-[2] aspect-video bg-serviceMenuBack bg-opacity-10 rounded-sm overflow-hidden ">
        {date === "00.00.0000" ? (
          <div className="absolute top-0 left-0 w-full h-full bg-ksGrayTp bg-opacity-10"></div>
        ) : (
          <img
            src={`https://katilimsigortacisi.com/img/${imgUrl}`}
            className="aspect-video w-full"
            alt=""
          />
        )}
      </section>
      <section className="flex-[3]">
        <header className="w-full line-clamp-2 text-xs text-start overflow-hidden duration-200">
          {agendaTitle}
        </header>
      </section>
      <div className="flex justify-between items-center absolute bottom-2 right-2 gap-2">
        <span className="w-16 bg-backColor text-xs text-titleColor duration-200 rounded-sm py-0.5 font-medium overflow-hidden">
          {date === "00.00.0000" ? "00.00.0000" : FormatedDate}
        </span>
        <div className=" w-12 bg-backColor text-xs text-titleColor duration-200 rounded-sm py-0.5 font-medium flex items-center justify-center gap-1">
          <i className="fa-solid fa-eye"></i>
          <div>
            {numberOfView.toString().length >= 4 &&
              numberOfView.toString().length < 7 &&
              numberOfView.toString().slice(0, -3) + " B"}
            {numberOfView.toString().length >= 7 &&
              numberOfView.toString().slice(0, -6) + " M"}
            {numberOfView.toString().length < 4 && numberOfView}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default AgendaContentSiderbarBox;
