import { useEffect } from "react";
import { useParams } from "react-router-dom";

function AgendaContent() {
  const { pathAgendaInfo } = useParams();

  useEffect(() => {
    //id -> pathAgendaInfo.split("-")[pathAgendaInfo.split("-").length - 1]
  }, [pathAgendaInfo]);

  return (
    <div className="page flex gap-10">
      <div className="w-[75%] flex flex-col gap-2.5">
        <header className="text-3xl font-medium text-myText">
          HABER BAŞLIĞI BU ŞEKİLDE GÖRÜNÜYOR
        </header>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5 text-sm">
            <p className="flex gap-1.5">
              <header className=" font-medium text-titleColor">
                Yayınlanma Tarihi
              </header>
              : 02.05.2024
            </p>
            <p className="flex gap-1.5">
              <header className="font-medium text-titleColor">
                Son Güncelleme Tarihi
              </header>
              : 02.05.2024
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-0.5 text-sm">
            <header className="font-medium bg-ksGrayTp w-20 flex items-center justify-center rounded-sm text-myText">
              Yazar
            </header>
            Hakan
          </div>
        </div>
        <div className="w-full aspect-video border-2 border-solid border-ksGrayTp rounded-md overflow-hidden">
          resim
        </div>
        <div className="flex items-center justify-between h-8">
          <div className="flex gap-2 h-full items-center">
            <button className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-sm hover:text-ksGreen duration-200 border-2 border-solid border-ksGrayTp hover:border-ksGreen">
              <i className="fa-solid fa-share-nodes"></i>
              <span>Paylaş</span>
            </button>
            <button className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-sm hover:text-ksGreen duration-200 border-2 border-solid border-ksGrayTp hover:border-ksGreen">
              <i className="fa-solid fa-play"></i>
              <span>İzle</span>
            </button>
          </div>
          <div className="flex gap-2 h-full items-center">
            {/* like and dislike  */}
            {/* <label className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-16 rounded-full hover:text-ksGreen duration-80 border-2 border-solid border-ksGrayTp hover:border-ksGreen duration-200 cursor-pointer">
              <i class="fa-regular fa-thumbs-up"></i>
              <span>0</span>
            </label>
            <label className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-16 rounded-full hover:text-ksGreen duration-80 border-2 border-solid border-ksGrayTp hover:border-ksGreen duration-200 cursor-pointer">
              <i class="fa-regular fa-thumbs-down"></i>
              <span>0</span>
            </label> */}
            <div
              title="Görüntülenme Sayısı"
              className="flex gap-1.5 items-center justify-center text-sm font-medium bg-preKsBoxBack text-preKsBoxIcon h-full w-20 rounded-full duration-200 border-2 border-solid border-ksGrayTp select-none"
            >
              <i className="fa-solid fa-eye"></i>
              <span>215</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">content</div>
      </div>
      <div className="flex flex-col gap-5 w-[25%]">sağ</div>
    </div>
  );
}

export default AgendaContent;
