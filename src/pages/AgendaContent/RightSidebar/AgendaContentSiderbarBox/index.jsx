import { useNavigate } from "react-router-dom";
import { convertFromTextToUrl } from "../../../../consts";

function AgendaContentSiderbarBox({ date, title, imgUrl, category, id }) {
  const navigate = useNavigate();

  const goOtherAgenda = () => {
    navigate(`/agenda/${category}/${convertFromTextToUrl(title)}-121212`);
  };

  return (
    <button
      onClick={() => goOtherAgenda()}
      className="agendaContentSiderbarBox flex flex-col w-full bg-preKsBoxBack overflow-hidden p-2.5 gap-2 shadow-lg relative"
    >
      <div className="w-full aspect-video bg-ksGrayTp bg-opacity-10 rounded-sm ">
        resim
      </div>
      <header className="line-clamp-2 text-sm text-start h-10 duration-200">
        {title}
      </header>
      <span className="absolute right-3 bottom-[60px] w-20 bg-backColor text-xs text-titleColor duration-200 rounded-sm py-0.5 font-medium">
        12.04.24
      </span>
      <span className="absolute left-3 bottom-[60px] w-12 bg-backColor text-xs text-titleColor duration-200 rounded-sm py-0.5 font-medium flex items-center justify-center gap-1">
        <i className="fa-solid fa-eye"></i>
        <span>0</span>
      </span>
    </button>
  );
}

export default AgendaContentSiderbarBox;
