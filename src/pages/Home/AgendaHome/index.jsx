import { useState } from "react";
import HomeTitle from "../../../components/HomeTitle";
import classNames from "classnames";

function AgendaHome() {
  const [activeAgendaTitleId, setActiveAgendaTitleId] = useState(0);
  const agendaTitles = [
    {
      title: "Haberler",
      dbKeyUrl: "",
      id: 0,
    },
    {
      title: "Makaleler",
      dbKeyUrl: "",
      id: 1,
    },
    {
      title: "Duyurular",
      dbKeyUrl: "",
      id: 2,
    },
  ];
  const lastAgendas = [
    {
      title:
        "Kaan Ayhan'ın joker kardeşi Mertcan Ayhan Beşiktaş'a transfer oluyormuş dediler",
      id: 0,
      imgUrl: "",
      url: "",
    },
    {
      title: "Haber 2",
      id: 1,
      imgUrl: "",
      url: "",
    },
    {
      title: "Haber 3",
      id: 2,
      imgUrl: "",
      url: "",
    },
    {
      title: "Haber 4",
      id: 3,
      imgUrl: "",
      url: "",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <HomeTitle>Gündeme Dair Her Şey Burada</HomeTitle>
      <div className="flex justify-center h-10 items-center gap-5">
        <div className="h-7 flex items-center justify-center font-medium text-lg border-r-2 border-solid border-r-ksGreen px-2.5">
          Son Paylaşılan
        </div>
        {agendaTitles.map((agenda) => (
          <button
            onClick={() => setActiveAgendaTitleId(agenda.id)}
            key={agenda.id}
            className={classNames(
              "rounded-md bg-backColor text-myText border-2 border-solid border-transparent hover:border-ksGreen h-10 min-w-32 text-base font-medium opacity-70 hover:opacity-100 duration-200",
              {
                "!bg-ksGreen !opacity-100 !text-white":
                  activeAgendaTitleId === agenda.id,
              }
            )}
          >
            {agenda.title}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {lastAgendas.map(
          (agenda) =>
            agenda.id < 3 && (
              <button className="agendaBoxHome h-auto w-80 bg-preKsBoxBack rounded-lg shadow-xl p-3 flex flex-col gap-2.5 hover:text-ksGreen transition-all hover:shadow-md">
                <div className="w-full bg-ksGrayTp aspect-video rounded-lg flex items-center justify-center font-medium relative">
                  <span className="text-myText">resim</span>
                  <p className="absolute right-1 top-1 text-xs font-medium bg-preKsBoxBack px-2 h-5 flex items-center justify-center rounded-full">
                    12/05/2024
                  </p>
                </div>
                <header className="text-base mb-2.5 h-12 font-medium line-clamp-2">
                  {agenda.title}
                </header>
                <button className="agendaBoxButtonHome h-8 w-full text-myText rounded-full bg-ksGrayTp font-medium text-sm duration-200">
                  Oku
                </button>
              </button>
            )
        )}
      </div>
      <div className="flex items-center justify-center mt-5">
        <button className="bg-preKsBoxBack w-[200px] border-2 border-solid border-ksGray duration-200 hover:text-ksGreen hover:border-ksGreen h-10 rounded-full hover:bg-ksGray font-semibold">
          Tüm {agendaTitles[activeAgendaTitleId].title}
        </button>
      </div>
    </div>
  );
}

export default AgendaHome;
