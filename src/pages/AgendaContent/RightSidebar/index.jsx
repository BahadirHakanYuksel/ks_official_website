import { useTranslation } from "react-i18next";
import AgendaContentSiderbarBox from "./AgendaContentSiderbarBox";

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
    <div className="flex flex-col w-[25%] gap-10">
      <div className="flex flex-col w-full gap-2.5">
        <header className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center">
          {agendaTitles[0].title}
        </header>
        <AgendaContentSiderbarBox
          category={agendaTitles[0].urlName}
          title={"Bu bir deneme başlığı"}
        />
        <AgendaContentSiderbarBox
          category={agendaTitles[0].urlName}
          title={"Bu bir deneme başlığı"}
        />
        <AgendaContentSiderbarBox
          category={agendaTitles[0].urlName}
          title={"Bu bir deneme başlığı"}
        />
      </div>
      <div className="flex flex-col w-full gap-2.5">
        <header className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center">
          {agendaTitles[1].title}
        </header>
        <AgendaContentSiderbarBox
          category={agendaTitles[1].urlName}
          title={"Bu bir deneme başlığı"}
        />
        <AgendaContentSiderbarBox
          category={agendaTitles[1].urlName}
          title={"Bu bir deneme başlığı"}
        />
        <AgendaContentSiderbarBox
          category={agendaTitles[1].urlName}
          title={"Bu bir deneme başlığı"}
        />
      </div>
      <div className="flex flex-col w-full gap-2.5">
        <header className="text-xl h-9 flex justify-center items-center font-medium text-white bg-ksGreen rounded-sm text-center">
          {agendaTitles[2].title}
        </header>
        <AgendaContentSiderbarBox
          category={agendaTitles[2].urlName}
          title={"Bu bir deneme başlığı"}
        />
        <AgendaContentSiderbarBox
          category={agendaTitles[2].urlName}
          title={"Bu bir deneme başlığı"}
        />
        <AgendaContentSiderbarBox
          category={agendaTitles[2].urlName}
          title={"Bu bir deneme başlığı"}
        />
      </div>
    </div>
  );
}

export default RightSidebar;
