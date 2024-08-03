import { motion } from "framer-motion";
import { closeModalBoxHandle } from "../../utils";
import { useSelector } from "react-redux";
import { useState } from "react";

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
  });
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
          onClick={closeModalBoxHandle}
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
                resim
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
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <header className="text-2xl font-medium text-titleColor">
                Yazar
              </header>
              <input
                type="text"
                placeholder="Yazar Adını Giriniz"
                className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
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
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <header className="text-2xl font-medium text-titleColor">
                  Son Güncelleme Tarihi
                </header>
                <input
                  type="date"
                  className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
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
