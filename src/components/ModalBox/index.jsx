import { AnimatePresence, motion } from "framer-motion";
import { closeModalBoxHandle, updateKsAdminHandle } from "../../utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useResponsiveData } from "../../Context";

function ModalBox() {
  const { modalInfos } = useSelector((state) => state.modal);
  const { isMobile } = useResponsiveData();
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
  const [dataToControl, setDataToControl] = useState([]);

  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [previewImg, setpreviewImg] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [uploadTime, setUploadTime] = useState(new Date());
  const [AllInputIsOk, setAllInputIsOk] = useState(false);
  const [Loading, setLoading] = useState(false);

  const adminUrl = import.meta.env.VITE_ADMIN_URL;

  const navigate = useNavigate();

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
        selectedText ? ` ${selectedText} ` : " Buraya_metni_giriniz "
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

  const updateImg = (file) => {
    setModalData({ ...modalData, ksImgUrl: file });
    setpreviewImg(URL.createObjectURL(file));
  };

  const allInputControl = () => {
    if (
      modalData.ksCategory !== "" &&
      modalData.ksContent !== "" &&
      modalData.ksContent.length <= 10000 &&
      modalData.ksImgUrl !== "" &&
      modalData.ksLastUpdateDate !== "" &&
      modalData.ksTitle !== "" &&
      modalData.ksUploadDate !== "" &&
      modalData.ksWriter !== ""
    ) {
      setAllInputIsOk(true);
    } else setAllInputIsOk(false);
  };

  const SaveAndUpdateOperations = async () => {
    if (modalInfos.operation === "edit") {
      setLoading(true);

      const myForm = new FormData();
      myForm.append("action", "edit-list");
      myForm.append("title", modalData.ksTitle);
      myForm.append("dsc", modalData.ksContent);
      myForm.append("writer", modalData.ksWriter);
      myForm.append("dat", modalData.ksUploadDate);
      myForm.append("lastDat", currentDateTime);
      myForm.append("ks_id", modalData.ksId);
      myForm.append("link", modalData.ksYoutubeLink);
      myForm.append("img_url", modalData.ksImgUrl);
      myForm.append("grup", modalData.ksCategory);
      try {
        await fetch("https://katilimsigortacisi.com/php-admin/", {
          method: "POST",
          body: myForm,
        })
          .then((res) => res.json())
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              document.location.reload();
            }, 500);
          });
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
          document.location.reload();
        }, 500);
      }
    } else if (modalInfos.operation === "add") {
      const myForm = new FormData();
      myForm.append("action", "add-todo");
      myForm.append("title", modalData.ksTitle);
      myForm.append("dsc", modalData.ksContent);
      myForm.append("writer", modalData.ksWriter);
      myForm.append("dat", modalData.ksUploadDate);
      myForm.append("lastDat", modalData.ksLastUpdateDate);
      myForm.append("ks_id", modalData.ksId);
      myForm.append("link", modalData.ksYoutubeLink);
      myForm.append("img_url", modalData.ksImgUrl);
      myForm.append("grup", modalData.ksCategory);
      try {
        await fetch("https://katilimsigortacisi.com/php-admin/", {
          method: "POST",
          body: myForm,
        })
          .then((res) => res.json())
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              document.location.reload();
            }, 500);
          });
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
          document.location.reload();
        }, 500);
      }
    }
  };

  const deleteOperation = async () => {
    // delete on db
    const myForm = new FormData();
    myForm.append("action", "delete-list");
    myForm.append("ks_id", modalData.ksId);

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: myForm,
      })
        .then((res) => res.json())
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            document.location.reload();
          }, 500);
        });
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        document.location.reload();
      }, 500);
    }
  };

  const createKS_ID = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomPassword = "";
    let isUnique = false;
    let controlNumber = 0;

    dataToControl.forEach((myData) => {
      if (myData.ks_id !== "ks1bhy") controlNumber++;
      else controlNumber = 0;
    });

    while (!isUnique) {
      randomPassword = "";
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPassword += characters[randomIndex];
      }
      if (controlNumber === dataToControl.length) {
        isUnique = true;
      }
    }

    return randomPassword;
  };

  const getControlDataOnDb = async () => {
    const myForm = new FormData();
    myForm.append("action", "list");
    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: myForm,
      })
        .then((res) => res.json())
        .then((db) => {
          setDataToControl(db);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const logOutOperations = () => {
    updateKsAdminHandle(false);
    localStorage.removeItem("ks_user");
    closeModalBoxHandle();
    navigate(`/admin-${adminUrl}`);
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
      setUploadTime(modalData.ksUploadDate);
      const formattedDate = format(currentDateTime, "yyyy-MM-dd HH:mm:ss");
      setCurrentDateTime(formattedDate);
    } else if (modalInfos.operation === "add") {
      getControlDataOnDb();
      const newKsId = createKS_ID();
      const formattedDate = format(uploadTime, "yyyy-MM-dd HH:mm:ss");
      setModalData({
        ...modalData,
        ksUploadDate: formattedDate,
        ksLastUpdateDate: formattedDate,
        ksCategory: modalInfos.data,
        ksId: newKsId,
      });
      setpreviewImg("");
    } else if (modalInfos.operation === "delete") {
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
    }
  }, []);

  useEffect(() => {
    allInputControl();
  }, [modalData, previewImg]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5 w-full bg-backColor z-20 fixed left-0 top-0 overflow-y-scroll h-screen"
    >
      <AnimatePresence>
        {Loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-40 w-full h-screen fixed left-0 top-0 bg-gradient-to-b to-ksGray text-white text-5xl font-medium from-ksGreen flex items-center justify-center"
          >
            Yükleniyor...
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-8 relative p-5 ">
        <header className="text-4xl">
          {modalInfos.operation === "edit" && "Düzenleme Ekranı"}
          {modalInfos.operation === "add" && "Yükleme Ekranı"}
          {modalInfos.operation === "delete" && "Silme Ekranı"}
          {modalInfos.operation === "logOut" && "Hesaptan Çıkıyorsun"}
        </header>
        <button
          onClick={() => {
            document.querySelector("html").style.overflowY = "auto";
            closeModalBoxHandle();
          }}
          className={classNames(
            "fixed right-8 top-2.5 w-28 h-10 rounded-full bg-ksGrayTp text-myText text-base font-medium hover:bg-black hover:text-white duration-200",
            {
              "!right-0 !top-0 !rounded-none !text-sm !w-24 !rounded-bl-md":
                isMobile,
            }
          )}
        >
          Kapat
        </button>
        {modalInfos.operation !== "delete" &&
          modalInfos.operation !== "logOut" && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <header className="text-2xl font-medium text-titleColor">
                  Resim {modalInfos.operation === "edit" && "Düzenle"}
                  {modalInfos.operation === "add" && "Yükle"}
                </header>
                <div
                  className={classNames(
                    "aspect-video flex items-center justify-center w-[800px] border-2 border-solid rounded-md overflow-hidden border-ksGrayTp relative",
                    {
                      "!w-full": isMobile,
                    }
                  )}
                >
                  <AnimatePresence>
                    {modalInfos.operation === "edit" && previewImg !== "" && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={previewImg !== "" && previewImg}
                        alt=""
                        className="w-full aspect-video"
                      />
                    )}
                    {modalInfos.operation === "add" && previewImg !== "" && (
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        src={previewImg !== "" && previewImg}
                        alt=""
                        className="w-full aspect-video"
                      />
                    )}
                    {previewImg === "" && (
                      <motion.label
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        htmlFor="imgInput"
                        className={classNames(
                          "absolute w-full text-4xl font-medium hover:bg-ksGreen hover:text-white duration-200 h-full flex items-center justify-center cursor-pointer select-none",
                          {
                            "!text-xl": isMobile,
                          }
                        )}
                      >
                        Resim Yüklemek İçin Tıklayın
                      </motion.label>
                    )}
                  </AnimatePresence>
                </div>
                <label
                  htmlFor="imgInput"
                  className="flex items-center justify-center cursor-pointer select-none w-32 h-12 rounded-md bg-green-600 text-white text-base font-medium"
                >
                  Resim Seç
                </label>
                <input
                  name="ksImgUrl"
                  type="file"
                  onChange={(e) => {
                    updateImg(e.target.files[0]);
                  }}
                  className="hidden"
                  id="imgInput"
                />
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
                  onChange={handleInputChange}
                  name="ksTitle"
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
                        Yazı Çok Uzun
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
                  onChange={handleInputChange}
                  name="ksWriter"
                />
              </div>
              <div
                className={classNames("grid grid-cols-3 gap-5", {
                  "!grid-cols-1 !gap-2.5": isMobile,
                })}
              >
                <div className="flex flex-col w-full gap-2.5">
                  <header className="text-2xl font-medium text-titleColor">
                    Yükleme Tarihi
                  </header>
                  <input
                    type="text"
                    className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                    value={modalData.ksUploadDate}
                    disabled={true}
                  />
                </div>
                {modalInfos.operation === "edit" && (
                  <>
                    <div className="flex flex-col w-full gap-2.5">
                      <header className="text-2xl font-medium text-titleColor">
                        Son Güncelleme Tarihi
                      </header>
                      <input
                        type="text"
                        className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                        value={modalData.ksLastUpdateDate}
                        disabled={true}
                      />
                    </div>
                    <div className="flex flex-col w-full gap-2.5">
                      <header className="text-2xl font-medium text-titleColor">
                        Yeni Güncelleme Tarihi
                      </header>
                      <input
                        type="text"
                        className="border-2 border-solid border-gray-300  bg-preKsBoxBack text-myText rounded-md h-12 focus:border-ksGreen duration-200 px-2.5"
                        value={currentDateTime}
                        disabled={true}
                      />
                    </div>
                  </>
                )}
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
                  onChange={handleInputChange}
                  name="ksYoutubeLink"
                />
              </div>
              <button
                disabled={!AllInputIsOk}
                onClick={SaveAndUpdateOperations}
                className="h-12 w-full flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 duration-200 font-medium text-xl disabled:pointer-events-none disabled:opacity-80"
              >
                {modalInfos.operation === "edit" && "Güncelle ve Kaydet"}
                {modalInfos.operation === "add" && "Yükle"}
              </button>
            </div>
          )}

        {modalInfos.operation === "delete" && (
          <div className="flex flex-col gap-2.5">
            <p className="text-xl font-medium text-myText mb-2.5">
              Bu Gönderiyi Silmek istediğinize emin misiniz ?
            </p>
            <header className="text-titleColor font-medium text-lg">
              {modalData.ksTitle}
            </header>
            <div
              className={classNames("w-[500px] h-auto aspect-video", {
                "!w-full": isMobile,
              })}
            >
              <img
                src={`https://katilimsigortacisi.com/img/${modalData.ksImgUrl}`}
                className="w-full aspect-video rounded-md"
                alt=""
              />
            </div>
            <div className="grid grid-cols-2 gap-5 h-12 w-full">
              <button
                onClick={deleteOperation}
                className="h-full flex items-center justify-center text-lg font-medium bg-red-600 text-white hover:bg-red-700 duration-200"
              >
                Sil
              </button>
              <button
                onClick={() => {
                  document.querySelector("html").style.overflowY = "auto";
                  closeModalBoxHandle();
                }}
                className="h-full flex items-center justify-center text-lg font-medium bg-[#24282a] text-white hover:bg-[#141718] duration-200"
              >
                İptal
              </button>
            </div>
          </div>
        )}

        {modalInfos.operation === "logOut" &&
          modalInfos.operation !== "delete" &&
          modalInfos.operation !== "add" && (
            <div className="flex flex-col gap-2.5">
              <p className="text-xl font-medium text-myText mb-2.5">
                Çıkış Yapmak İstediğinize Emin Misiniz ?
              </p>
              <div className="grid grid-cols-2 gap-5 h-12 w-full">
                <button
                  onClick={logOutOperations}
                  className="h-full flex items-center justify-center text-lg font-medium bg-red-600 text-white hover:bg-red-700 duration-200"
                >
                  Çıkış Yap
                </button>
                <button
                  onClick={() => {
                    document.querySelector("html").style.overflowY = "auto";
                    closeModalBoxHandle();
                  }}
                  className="h-full flex items-center justify-center text-lg font-medium bg-[#24282a] text-white hover:bg-[#141718] duration-200"
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
