import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fastMenuData = [
    {
      url: "/admin/news",
      title: t("news"),
      id: 0,
    },
    {
      url: "/admin/articles",
      title: t("articles"),
      id: 1,
    },
    {
      url: "/admin/announcements",
      title: t("announcements"),
      id: 2,
    },
    {
      url: "/admin/account-settings",
      title: "Hesap Ayarları",
      id: 3,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full h-[400px] bg-gradient-to-t to-ksGreen from-ksGray text-white text-5xl font-medium flex items-center justify-center shadow-lg relative rounded-t-md">
        <div className="absolute left-2.5 top-2.5 text-sm text-backColor">
          HIZLI MENÜ
        </div>
        <header className="mb-5">
          Katılım Sigortası Admin Paneline Hoşgeldiniz
        </header>
        <div className="flex items-center justify-center gap-8 absolute h-40 left-1/2 -translate-x-1/2 -bottom-12">
          {fastMenuData.map((menu) => (
            <button
              onClick={() => navigate(menu.url)}
              key={menu.id}
              className="h-full w-40 flex items-center justify-center border-0 border-solid border-ksGrayTp text-xl rounded-lg font-medium text-myText shadow-lg hover:text-ksGreen duration-200 bg-preKsBoxBack"
            >
              {menu.title}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[150px] bg-gradient-to-t to-ksGray from-ksGreen rounded-b-md"></div>
      <div className="text-titleColor font-medium text-sm flex items-center justify-center h-10">
        2024-Katılım Sigortası Admin Paneli
      </div>
    </div>
  );
}

export default Admin;
