import { useSelector } from "react-redux";
import { closeTeamModalHandle } from "../../../../utils";

export default function DeleteModal() {
  const { teamModal } = useSelector((state) => state.modal);

  const deleteTeam = async () => {
    const formData = new FormData();
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const counsellorDel = import.meta.env.VITE_REQUEST_COUNSELLOR_DELETE;
    formData.append("action", counsellorDel);
    formData.append("counsellor_id", teamModal.id);

    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          alert("Danışman başarıyla silindi.");
          closeTeamModalHandle();
          document.location.reload();
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      id="deleteModal"
      onClick={(e) => e.target.id === "deleteModal" && closeTeamModalHandle()}
      className="flex items-center justify-center h-screen w-full bg-black bg-opacity-50 fixed top-0 left-0 z-50"
    >
      <div className="flex flex-col gap-5 w-[310px] h-auto p-5 rounded-lg shadow-lg bg-[#111111] border-2 border-solid border-myText">
        <p className="-mb-2.5">
          <span className="font-medium text-green-300">Danışman Adı :</span>{" "}
          {teamModal.name}
        </p>
        <header className="text-gray-300 text-2xl">
          Danışmanı silmek istediğinizden emin misiniz?
        </header>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={deleteTeam}
            className="border-2 border-solid text-gray-200 font-medium border-red-600 bg-red-600 hover:bg-red-700 hover:border-white hover:text-white duration-200 rounded-lg h-10"
          >
            Sil
          </button>
          <button
            onClick={closeTeamModalHandle}
            className="border-2 border-solid border-gray-500 text-gray-200 font-medium hover:border-white hover:bg-black hover:text-white duration-200 rounded-lg"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}
