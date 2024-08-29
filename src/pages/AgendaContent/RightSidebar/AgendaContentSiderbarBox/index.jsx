import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../../../consts";
import { useEffect, useState } from "react";

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
    setNumberOfView(Number(viewNum) + 1);

    const formData = new FormData();
    formData.append("action", "updateAgendaNumberOfViews");
    formData.append("ks_id", id);
    formData.append("number_of_views", `${Number(viewNum) + 1}`);

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goOtherAgenda = () => {
    updateViewNumber();
    navigate(`/agenda/${category}/${convertFromTextToUrl(title)}-${id}`);
  };

  return (
    <button
      onClick={() => goOtherAgenda()}
      className="agendaContentSiderbarBox flex flex-col w-full bg-preKsBoxBack overflow-hidden p-2.5 gap-2 shadow-lg relative rounded-sm"
    >
      <div className="w-full aspect-video bg-ksGrayTp bg-opacity-10 rounded-sm overflow-hidden ">
        <img
          src={`https://katilimsigortacisi.com/img/${imgUrl}`}
          className="w-full aspect-video"
          alt=""
        />
      </div>
      <header className="line-clamp-2 text-sm text-start h-10 duration-200">
        {agendaTitle}
      </header>
      <span className="absolute right-3 bottom-[60px] w-20 bg-backColor text-xs text-titleColor duration-200 rounded-sm py-0.5 font-medium overflow-hidden">
        {FormatedDate}
      </span>
      <div className="absolute left-3 bottom-[60px] w-12 bg-backColor text-xs text-titleColor duration-200 rounded-sm py-0.5 font-medium flex items-center justify-center gap-1">
        <i className="fa-solid fa-eye"></i>
        <span>
          {numberOfView.toString().length >= 4 &&
            numberOfView.toString().length < 7 &&
            numberOfView.toString().slice(0, -3) + " B"}
          {numberOfView.toString().length >= 7 &&
            numberOfView.toString().slice(0, -6) + " M"}
          {numberOfView.toString().length < 4 && numberOfView}
        </span>
      </div>
    </button>
  );
}

export default AgendaContentSiderbarBox;
