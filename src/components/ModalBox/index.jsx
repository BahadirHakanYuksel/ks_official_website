import { motion } from "framer-motion";
import { closeModalBoxHandle } from "../../utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classNames from "classnames";

function ModalBox() {
  const { modalInfos } = useSelector((state) => state.modal);
  const [modalData, setModalData] = useState({
    ksId: "",
    ksTitle: "",
    ksContent: "",
    ksWriter: "",
    ksUploadDate: "",
    ksLastUpdateDate: "",
    ksYoutubeLink: "",
    ksCategory: "",
    ksImgUrl: "",
    id: "",
  });
  const [FirstData, setFirstData] = useState({
    ksId: "",
    ksTitle: "",
    ksContent: "",
    ksWriter: "",
    ksUploadDate: "",
    ksLastUpdateDate: "",
    ksYoutubeLink: "",
    ksCategory: "",
    ksImgUrl: "",
    id: "",
  });

  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [previewImg, setpreviewImg] = useState("");

  const insertMarkup = (
    startTag,
    endTag = startTag,
    isLink = false,
    isList = false
  ) => {
    const textarea = document.getElementById("editor-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let newText = "";

    if (isLink) {
      newText = `${textarea.value.substring(0, start)}[${
        selectedText || "Link metni"
      }](Link_Adresi)${textarea.value.substring(end)}`;
    } else if (isList) {
      // Satırları döngüyle gezerek her birini liste elemanına dönüştür
      const lines = selectedText.split("\n");
      newText = `${textarea.value.substring(0, start)}`;
      lines.forEach((line, index) => {
        newText += `* ${line.trim()}`;
        if (index !== lines.length - 1) {
          newText += "\n";
        }
      });
      newText += `${textarea.value.substring(end)}`;
    } else {
      newText = `${textarea.value.substring(0, start)}${startTag}${
        selectedText ? selectedText : " Buraya_metni_giriniz "
      }${endTag}${textarea.value.substring(end)}`;
    }

    if (currentStep < history.length - 1) {
      setHistory(history.slice(0, currentStep + 1));
    }
    const newHistory = [...history, newText];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);

    setModalData({
      ...modalData,
      ksContent: newText,
    });
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setModalData({
        ...modalData,
        ksContent: history[currentStep - 1],
      });
    }
  };

  const myMarkupButtons = [
    {
      text: "Kalın",
      works: ("**", "**"),
    },
    {
      text: (
        <div className="flex items-center gap-2.5">
          <span>Renkli</span>
          <div className="flex items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-green-300 -ml-1.5"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-600 -ml-1.5"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-900 -ml-1.5"></div>
          </div>
        </div>
      ),
      works: ("--", "--"),
    },
    {
      text: "Başlık 1",
      works: ("###", "###"),
    },
    {
      text: "Başlık 2",
      works: ("##", "##"),
    },
    {
      text: "Başlık 3",
      works: ("#", "#"),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData({
      ...modalData,
      [name]: value,
    });
  };

  useEffect(() => {
    document.querySelector("html").style.overflowY = "hidden";
    if (modalInfos.operation === "edit") {
      setModalData({
        ksId: modalInfos.myData.ks_id,
        ksTitle: modalInfos.myData.title,
        ksContent: modalInfos.myData.dsc,
        ksWriter: modalInfos.myData.writer,
        ksUploadDate: modalInfos.myData.dat,
        ksLastUpdateDate: modalInfos.myData.lastDat,
        ksYoutubeLink: modalInfos.myData.link,
        ksCategory: modalInfos.myData.grup,
        ksImgUrl: modalInfos.myData.img_url,
        id: modalInfos.myData.id,
      });
      setFirstData({
        ksId: modalInfos.myData.ks_id,
        ksTitle: modalInfos.myData.title,
        ksContent: modalInfos.myData.dsc,
        ksWriter: modalInfos.myData.writer,
        ksUploadDate: modalInfos.myData.dat,
        ksLastUpdateDate: modalInfos.myData.lastDat,
        ksYoutubeLink: modalInfos.myData.link,
        ksCategory: modalInfos.myData.grup,
        ksImgUrl: modalInfos.myData.img_url,
        id: modalInfos.myData.id,
      });
      setpreviewImg(
        `https://katilimsigortacisi.com/img/${modalInfos.myData.img_url}`
      );
    }
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5 w-full bg-backColor z-20 fixed left-0 top-0 overflow-y-scroll h-screen"
    >
      <div className="flex flex-col gap-8 relative p-5 ">
        <header className="text-4xl">
          {modalInfos.operation === "edit" && "Düzenleme Ekranı"}
          {modalInfos.operation === "add" && "Yükleme Ekranı"}
          {modalInfos.operation === "delete" && "Silme Ekranı"}
        </header>
        <button
          onClick={() => {
            document.querySelector("html").style.overflowY = "auto";
            closeModalBoxHandle();
          }}
          className="fixed right-8 top-2.5 w-28 h-10 rounded-full bg-ksGrayTp text-myText text-base font-medium hover:bg-black hover:text-white duration-200"
        >
          Kapat
        </button>
        {modalInfos.operation !== "delete" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <header className="text-2xl font-medium text-titleColor">
                Resim {modalInfos.operation === "edit" && "Düzenle"}
                {modalInfos.operation === "add" && "Yükle"}
              </header>
              <div className="aspect-video flex items-center justify-center w-[800px] border-2 border-solid rounded-md overflow-hidden border-ksGrayTp">
                {modalInfos.operation === "edit" && (
                  <img
                    src={previewImg}
                    alt=""
                    className="w-full aspect-video"
                  />
                )}
              </div>
              <label
                htmlFor="imgInput"
                className="flex items-center justify-center cursor-pointer select-none w-32 h-12 rounded-md bg-green-600 text-white text-base font-medium"
              >
                Resim Seç
              </label>
              <input type="file" className="hidden" id="imgInput" />
            </div>
            <div className="flex flex-col gap-2.5">
              <header className="text-2xl font-medium text-titleColor">
                Başlık
              </header>
              <input
                type="text"
                placeholder="Başlık Giriniz"
                className="border-2 border-solid border-gray-300 bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                value={modalData.ksTitle}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className={classNames("flex items-center gap-3", {})}>
                  <header className="text-2xl text-titleColor font-medium">
                    Yazı/Açıklama
                  </header>
                  <button
                    onClick={() => {
                      setModalData({
                        ...modalData,
                        ksContent: FirstData.ksContent,
                      });
                    }}
                    className={classNames(
                      "bg-ksGrayTp text-myText font-medium h-8 text-center rounded-md px-4",
                      {}
                    )}
                  >
                    Sıfırla
                  </button>
                </div>
                <div className="flex gap-3 items-center">
                  {modalData.ksContent.length > 10000 && (
                    <header className="text-red-600 font-medium text-base">
                      {myGrupName} Yazısı Çok Uzun
                    </header>
                  )}
                  <span
                    className={classNames(
                      "flex gap-1 text-gray-500 font-medium"
                    )}
                  >
                    {modalData.ksContent.length}
                    <span>/</span> <span>10.000</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5 py-2">
                {myMarkupButtons.map((btn) => (
                  <button
                    className={classNames(
                      "text-base font-medium border-2 border-solid border-gray-400 rounded-md w-24 flex items-center justify-center h-8 hover:border-green-600 hover:text-green-600 duration-200",
                      {}
                    )}
                    onClick={() => insertMarkup(btn.works)}
                  >
                    {btn.text}
                  </button>
                ))}

                <button
                  className={classNames(
                    "text-base font-medium border-2 border-solid border-gray-400 rounded-md w-24 flex items-center justify-center h-8 hover:border-green-600 hover:text-green-600 duration-200",
                    {}
                  )}
                  onClick={() => insertMarkup("* ", "\n", false, true)}
                >
                  Liste
                </button>
                <button
                  className={classNames(
                    "text-base font-medium border-2 border-solid border-gray-400 rounded-md w-24 flex items-center justify-center h-8 hover:border-green-600 hover:text-green-600 duration-200",
                    {}
                  )}
                  onClick={() => insertMarkup("[", "]", true)}
                >
                  Link
                </button>
                <button
                  className={classNames(
                    "text-base font-medium border-2 border-solid border-blue-500 text-white bg-blue-500 rounded-md w-24 flex items-center justify-center h-8 hover:bg-blue-600 hover:border-blue-600  duration-200",
                    {}
                  )}
                  onClick={undo}
                >
                  Geri Al
                </button>
              </div>
              <textarea
                id="editor-textarea"
                name="ksContent"
                value={modalData.ksContent}
                onChange={handleInputChange}
                type="text"
                className="border-2 border-solid bg-preKsBoxBack text-myText border-gray-200 rounded-md focus-within:border-green-500 text-base p-2 overflow-hidden h-[520px] resize-none outline-none overflow-y-auto"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2.5">
              <header className="text-2xl font-medium text-titleColor">
                Yazar
              </header>
              <input
                type="text"
                placeholder="Yazar Adını Giriniz"
                className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                value={modalData.ksWriter}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2.5">
                <header className="text-2xl font-medium text-titleColor">
                  Yükleme Tarihi
                </header>
                <input
                  type="date"
                  className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                  value={modalData.ksUploadDate}
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <header className="text-2xl font-medium text-titleColor">
                  Son Güncelleme Tarihi
                </header>
                <input
                  type="text"
                  className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                  value={modalData.ksLastUpdateDate}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <header className="text-2xl font-medium text-titleColor">
                YouTube Linki
              </header>
              <input
                type="text"
                placeholder="YouTube Linki Giriniz"
                className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                value={modalData.ksYoutubeLink}
              />
            </div>
            <button className="h-12 w-full flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 duration-200 font-medium text-xl">
              {modalInfos.operation === "edit" && "Güncelle ve Kaydet"}
              {modalInfos.operation === "add" && "Yükle"}
            </button>
          </div>
        )}

        {modalInfos.operation === "delete" && (
          <div className="flex flex-col gap-2.5">
            <p className="text-xl font-medium text-myText">
              Silmek istediğine emin misin ?
            </p>
            <div className="grid grid-cols-2 gap-5 h-12 w-full">
              <button className="h-full flex items-center justify-center text-lg font-medium bg-red-600 text-white hover:bg-red-700 duration-200">
                Sil
              </button>
              <button
                onClick={closeModalBoxHandle}
                className="h-full flex items-center justify-center text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 duration-200"
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ModalBox;
