import classNames from "classnames";
import { useResponsiveData } from "../../../../Context";
import { SettingsHeader } from "../PasswordUpdate";
import { useEffect, useState } from "react";

export default function PresentationUpdate() {
  const { isTablet } = useResponsiveData();

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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2.5">
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
              {lng.nameTR}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {activeLng === "tr" &&
          presentationImages.tr.map((image, index) => (
            <div key={index}>
              <label className="flex border-2 border-solid border-ksGrayTp w-full aspect-video overflow-hidden rounded-lg cursor-pointer bg-gray-200 text-gray-500 hover:bg-ksGreen hover:text-white duration-200">
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => handleImageUpload(e, "tr", index)}
                />
                {image.url && (
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
              <div className="flex flex-col mt-1.5">
                <header className="text-titleColor font-medium">Link</header>
                <input
                  type="text"
                  placeholder="Enter link"
                  value={image.link}
                  onChange={(e) => handleLinkChange(e, "tr", index)}
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5"
                />
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
                {image.url && (
                  <img
                    src={image.url}
                    className="w-full aspect-video"
                    alt={`EN Preview ${index}`}
                  />
                )}
                {image.url === "" && (
                  <div className="flex justify-center text-lg font-medium items-center w-full h-full pointer-events-none">
                    <p className="">Upload image</p>
                  </div>
                )}
              </label>
              <div className="flex flex-col mt-1.5">
                <header className="text-titleColor font-medium">Link</header>
                <input
                  type="text"
                  placeholder="Enter link"
                  value={image.link}
                  onChange={(e) => handleLinkChange(e, "en", index)}
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="flex ">
        <button className="bg-black w-full h-16 text-xl font-medium rounded-full border-2 border-solid border-ksGrayTp hover:border-ksGreen duration-200">
          Kaydet
        </button>
      </div>
    </div>
  );
}
