import { useNavigate } from "react-router-dom";

function AdminErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[500px] bg-preKsBoxBack rounded-md flex flex-col justify-center items-center gap-5">
      <header className=" text-3xl font-medium">Sayfa Bulunamadı :/</header>
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center justify-center rounded-full h-12 w-44 bg-ksGray hover:bg-ksGreen duration-150 hover:text-white"
      >
        Anasayafaya Dön
      </button>
    </div>
  );
}

export default AdminErrorPage;
