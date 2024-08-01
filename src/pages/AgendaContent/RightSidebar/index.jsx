import { useTranslation } from "react-i18next";

function RightSidebar() {
  const { t } = useTranslation();

  const agendaTitles = [
    {
      urlName: "news",
      title: t("news"),
      dbKeyUrl: "",
      id: 0,
    },
    {
      urlName: "articles",
      title: t("articles"),
      dbKeyUrl: "",
      id: 1,
    },
    {
      urlName: "announcements",
      title: t("announcements"),
      dbKeyUrl: "",
      id: 2,
    },
  ];

  return (
    <div className="flex flex-col w-[25%] gap-2.5">
      <header className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center">
        {agendaTitles[0].title}
      </header>
      <button className="flex flex-col w-full bg-preKsBoxBack overflow-hidden p-2.5 gap-2 shadow-lg">
        <div className="w-full aspect-video bg-ksGrayTp bg-opacity-10 rounded-sm">
          resim
        </div>
        <p className="text-sm w-full h-10 line-clamp-2 flex justify-start">
          Haber başlığı bu şekilde görünecek başlığı bu şekilde görünecek
          başlığı bu şekilde görünecek
        </p>
      </button>
      <button className="flex flex-col w-full bg-preKsBoxBack overflow-hidden p-2.5 gap-2 shadow-lg">
        <div className="w-full aspect-video bg-ksGrayTp bg-opacity-10 rounded-sm">
          resim
        </div>
        <header className="text-sm line-clamp-2 h-10 flex justify-start">
          Haber başlığı bu şekilde görünecek
        </header>
      </button>
    </div>
  );
}

export default RightSidebar;
