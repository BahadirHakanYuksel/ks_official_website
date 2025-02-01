import classNames from "classnames";
import { useResponsiveData } from "../../../../Context";
import { SettingsHeader } from "../PasswordUpdate";
import { useEffect, useState } from "react";

export default function PresentationUpdate() {
  const { isTablet, isMobile } = useResponsiveData();
  const request_url = import.meta.env.VITE_REQUEST_URL;
  const getPresentaImg = import.meta.env.VITE_REQUEST_PRESENTATIONS_IMAGES_GET;
  const updatePresentaImg = import.meta.env
    .VITE_REQUEST_PRESENTATIONS_IMAGES_UPDATE;

  const [loading, setLoading] = useState(false);
  const languages = [
    {
      nameTR: "Türkçe",
      nameEN: "Turkish",
      value: "tr",
    },
    {
      nameTR: "İngilizce",
      nameEN: "English",
      value: "en",
    },
  ];

  const [activeLng, setActiveLng] = useState("tr");

  const [presentationImages, setPresentationImages] = useState({
    tr: [
      { id: 0, file: null, url: "", link: "" },
      { id: 1, file: null, url: "", link: "" },
      { id: 2, file: null, url: "", link: "" },
    ],
    en: [
      { id: 0, file: null, url: "", link: "" },
      { id: 1, file: null, url: "", link: "" },
      { id: 2, file: null, url: "", link: "" },
    ],
  });

  const handleImageUpload = (e, lng, id) => {
    const file = e.target.files[0]; // Seçilen dosyayı alıyoruz
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Dosya önizleme URL'si oluşturuluyor

      // State'i güncelliyoruz
      setPresentationImages((prevState) => {
        const updatedLngImages = [...prevState[lng]]; // Dilin mevcut state'ini kopyalıyoruz
        updatedLngImages[id] = { ...updatedLngImages[id], file, url: fileUrl }; // İlgili id'yi güncelliyoruz

        return { ...prevState, [lng]: updatedLngImages }; // Yeni state'i döndürüyoruz
      });
    }
  };

  const handleLinkChange = (e, lng, id) => {
    const link = e.target.value; // Kullanıcı tarafından girilen link

    // State'i güncelliyoruz
    setPresentationImages((prevState) => {
      const updatedLngImages = [...prevState[lng]]; // Dilin mevcut state'ini kopyalıyoruz
      updatedLngImages[id] = { ...updatedLngImages[id], link }; // İlgili id'nin linkini güncelliyoruz

      return { ...prevState, [lng]: updatedLngImages }; // Yeni state'i geri döndürüyoruz
    });
  };

  let alertCounter = 0;

  const updateElement = async (lng = "", queue = 0, url = "", link = "") => {
    const formData = new FormData();

    formData.append("action", updatePresentaImg);
    formData.append("url", url);
    formData.append("link", link);
    formData.append("queue", queue);
    formData.append("lng", lng);

    try {
      const res = await fetch(request_url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Ağ hatası:");
      }

      if (alertCounter === 5) {
        setLoading(false);
        alert("Başarıyla güncellendi.");
      }
    } catch (error) {
      if (alertCounter === 5) {
        alert("Hata ! Lütfen tekrar deneyin.");
        setLoading(false);
      }
    }
  };

  const updatePresenteInfos = async () => {
    alertCounter = 0;
    setLoading(true);
    try {
      // TR dilindeki resimleri güncelle
      for (const [index, image] of presentationImages.tr.entries()) {
        await updateElement("tr", index, image.file, image.link);
        alertCounter++;
      }

      // EN dilindeki resimleri güncelle
      for (const [index, image] of presentationImages.en.entries()) {
        await updateElement("en", index, image.file, image.link);
        alertCounter++;
      }
    } catch (error) {}
  };

  const getPresentationImages = async () => {
    const formData = new FormData();
    formData.append("action", getPresentaImg);

    try {
      const res = await fetch(request_url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Ağ hatası: " + res.status);
      }

      const db = await res.json();
      const updatedImages = { tr: [], en: [] };

      db.forEach((item) => {
        const { lng, queue, url, link } = item;
        item.id > 3
          ? (updatedImages[lng][queue] = {
              id: item.id - 4,
              file: null,
              url,
              link,
            })
          : (updatedImages[lng][queue] = {
              id: item.id - 1,
              file: null,
              url,
              link,
            });
      });

      setPresentationImages(updatedImages);
    } catch (error) {
      console.error("Error:", error);
      alert("Bir hata oluştu !");
    }
  };

  useEffect(() => {
    getPresentationImages();
  }, []);

  return (
    <div className="flex flex-col gap-5 pb-8">
      <div
        className={classNames("flex items-center justify-between", {
          "!flex-col gap-2.5": isMobile,
        })}
      >
        <SettingsHeader>Reklam Panosu Düzenleme</SettingsHeader>
        <div className="flex flex-wrap h-11 -mt-2.5">
          {languages.map((lng, i) => (
            <button
              key={i}
              onClick={() => setActiveLng(lng.value)}
              className={classNames(
                "text-titleColor text-lg hover:text-ksGreen font-medium bg-goUpButtonBack px-3.5 h-full duration-200 border-2 border-solid border-ksGrayTp ",
                {
                  "!text-sm": isTablet,
                },
                {
                  "!pointer-events-none !border-ksGreen !border-r-2 !border-l-2 !text-myText":
                    lng.value === activeLng,
                },
                {
                  "!border-l-0": i !== 0,
                },
                {
                  "border-r-0": i !== 1,
                }
              )}
            >
              {!isMobile && activeLng === "tr" && lng.nameTR}
              {!isMobile && activeLng === "en" && lng.nameEN}
              {isMobile && lng.value.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div
        className={classNames("grid grid-cols-3 gap-5", {
          "!grid-cols-1": isTablet,
        })}
      >
        {activeLng === "tr" &&
          presentationImages.tr.map((image, index) => (
            <div key={index}>
              <label className="flex border-2 border-solid border-ksGrayTp w-full aspect-video overflow-hidden rounded-lg cursor-pointer bg-gray-200 text-gray-500 hover:bg-ksGreen hover:text-white duration-200">
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => handleImageUpload(e, "tr", index)}
                />
                {image.url && image.url.includes("../psi/") && (
                  <img
                    src={`https://katilimsigortacisi.com/${image.url}`}
                    className="w-full aspect-video"
                    alt={`TR Preview ${index}`}
                  />
                )}
                {image.url && !image.url.includes("../psi/") && (
                  <img
                    src={image.url}
                    className="w-full aspect-video"
                    alt={`TR Preview ${index}`}
                  />
                )}
                {image.url === "" && (
                  <div className="flex justify-center text-lg font-medium items-center w-full h-full pointer-events-none">
                    <p className="">Upload image</p>
                  </div>
                )}
              </label>
              <div className="flex items-center h-20 mt-2.5 gap-2.5">
                <div className="flex flex-col h-full w-[25%]">
                  <header className="h-6"></header>
                  <label className="flex cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 items-center justify-center duration-200 text-sm font-medium h-12 px-2.5 w-full">
                    <input
                      className="hidden"
                      type="file"
                      onChange={(e) => handleImageUpload(e, "tr", index)}
                    />
                    <header className="h-8"></header>
                    Resim Yükle
                  </label>
                </div>
                <div className="flex flex-col h-full w-[75%]">
                  <header className="text-titleColor font-medium">Link</header>
                  <input
                    type="text"
                    placeholder="Enter link"
                    value={image.link}
                    onChange={(e) => {
                      handleLinkChange(e, "tr", index);
                      handleLinkChange(e, "en", index);
                    }}
                    className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5"
                  />
                </div>
              </div>
            </div>
          ))}

        {activeLng === "en" &&
          presentationImages.en.map((image, index) => (
            <div key={index}>
              <label className="flex border-2 border-solid border-ksGrayTp w-full aspect-video overflow-hidden rounded-lg cursor-pointer bg-gray-200 text-gray-500 hover:bg-ksGreen hover:text-white duration-200">
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => handleImageUpload(e, "en", index)}
                />
                {image.url && image.url.includes("../psi/") && (
                  <img
                    src={`https://katilimsigortacisi.com/${image.url}`}
                    className="w-full aspect-video"
                    alt={`TR Preview ${index}`}
                  />
                )}
                {image.url && !image.url.includes("../psi/") && (
                  <img
                    src={image.url}
                    className="w-full aspect-video"
                    alt={`TR Preview ${index}`}
                  />
                )}
                {image.url === "" && (
                  <div className="flex justify-center text-lg font-medium items-center w-full h-full pointer-events-none">
                    <p className="">Upload image</p>
                  </div>
                )}
              </label>
              <div className="flex items-center h-20 mt-2.5 gap-2.5">
                <div className="flex flex-col h-full w-[25%]">
                  <header className="h-6"></header>
                  <label className="flex cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 items-center justify-center duration-200 text-sm font-medium h-12 px-2.5 w-full">
                    <input
                      className="hidden"
                      type="file"
                      onChange={(e) => handleImageUpload(e, "en", index)}
                    />
                    <header className="h-8"></header>
                    Resim Yükle
                  </label>
                </div>
                <div className="flex flex-col h-full w-[75%]">
                  <header className="text-titleColor font-medium">Link</header>
                  <input
                    type="text"
                    placeholder="Enter link"
                    value={image.link}
                    onChange={(e) => {
                      handleLinkChange(e, "tr", index);
                      handleLinkChange(e, "en", index);
                    }}
                    className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex ">
        <button
          onClick={updatePresenteInfos}
          className={classNames(
            "bg-black text-white w-full h-16 text-xl font-medium rounded-full border-2 border-solid border-ksGrayTp hover:border-ksGreen duration-200 pointer-events-auto",
            {
              "!pointer-events-none": loading,
            }
          )}
        >
          {loading ? "Yükleniyor..." : "Güncelle"}
        </button>
      </div>
    </div>
  );
}
