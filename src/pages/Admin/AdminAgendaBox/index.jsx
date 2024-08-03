import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { openModalBoxHandle } from "../../../utils";

function AdminAgendaBox({ agendaDate, agendaTitle, category, id }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goAgendaModalPage = () => {
    navigate(`/admin/${category}/${agendaTitle}-${id}`);
  };

  const modalActions = (operation) => {
    switch (operation) {
      case "edit":
        openModalBoxHandle({
          operation,
          agendaId: id,
        });
        break;
      case "delete":
        openModalBoxHandle({
          operation,
          agendaId: id,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="agendaBoxHome h-[290.5px] w-80 bg-preKsBoxBack rounded-lg shadow-xl p-3 flex flex-col gap-2.5 hover:text-ksGreen transition-all hover:shadow-md relative overflow-hidden">
      <div className="w-full bg-ksGrayTp aspect-video rounded-lg flex items-center justify-center font-medium relative">
        <span className="text-myText">resim</span>
        <p className="absolute right-1 top-1 text-xs font-medium bg-preKsBoxBack px-2 h-5 flex items-center justify-center rounded-full">
          {agendaDate}
        </p>
      </div>
      <header className="text-start text-base mb-2.5 h-12 font-medium line-clamp-2">
        {agendaTitle}
      </header>
      <button
        onClick={() => modalActions("edit")}
        className="adminAgendaBoxButtonEdit absolute -bottom-12 left-2.5 h-10 w-[140px] text-myText rounded-full bg-ksGrayTp font-medium text-sm duration-200 hover:text-white hover:bg-ksGreen"
      >
        Düzenle
      </button>
      <button
        onClick={() => modalActions("delete")}
        className="adminAgendaBoxButtonDel absolute -bottom-12 right-2.5 h-10 w-[140px] text-myText rounded-full bg-ksGrayTp font-medium text-sm duration-200 hover:bg-red-600 hover:text-white"
      >
        Sil
      </button>
      <div className="absolute text-xs agendaBoxMarkName opacity-100 duration-200 bottom-3 left-1/2 -translate-x-1/2 w-full bg-ksGrayTp h-1.5 rounded-full "></div>
    </div>
  );
}

export default AdminAgendaBox;
