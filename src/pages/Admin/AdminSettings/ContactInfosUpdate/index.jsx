import { useTranslation } from "react-i18next";
import { SettingsHeader } from "..";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function ContactInfosUpdate() {
  const { t } = useTranslation();

  const [contactInfos, setContactInfos] = useState({
    telNo: "",
    email: "",
    neighborhood: "",
    street: "",
    no: "",
    apartment: "",
    district: "",
    city: "",
    googleMapsIframe: "",
    googleMapsLink: "",
    instagram: "",
    facebook: "",
    youtube: "",
  });

  const [loading, setLoading] = useState(false);

  const addressInformations = [
    {
      title: "Neighborhood",
      value: contactInfos.neighborhood,
      name: "neighborhood",
      shortName: "Hood.",
    },
    {
      title: "Street",
      value: contactInfos.street,
      name: "street",
      shortName: "St.",
    },
    {
      title: "No",
      value: contactInfos.no,
      name: "no",
      shortName: "No",
    },
    {
      title: "Apartment",
      value: contactInfos.apartment,
      name: "apartment",
      shortName: "Apt.",
    },
    {
      title: "District",
      value: contactInfos.district,
      name: "district",
      shortName: "Dist.",
    },
    {
      title: "City",
      value: contactInfos.city,
      name: "city",
      shortName: "City",
    },
  ];

  const socialMediaInformations = [
    {
      title: "Instagram",
      value: contactInfos.instagram,
      name: "instagram",
      icon: "fa-brands fa-instagram",
    },
    {
      title: "Facebook",
      value: contactInfos.facebook,
      name: "facebook",
      icon: "fa-brands fa-facebook",
    },
    {
      title: "Youtube",
      value: contactInfos.youtube,
      name: "youtube",
      icon: "fa-brands fa-youtube",
    },
  ];

  const changeContactInfos = (e) => {
    const { name, value } = e.target;
    setContactInfos({ ...contactInfos, [name]: value });
  };

  const updateContactInfos = async () => {
    const formData = new FormData();
    formData.append("action", "updateContactInfos");
    formData.append("contactInformations", JSON.stringify(contactInfos));

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      }).then(() => alert("İletişim Bilgileri Güncellendi"));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getContactInfos();
  }, []);

  const getContactInfos = async () => {
    const formData = new FormData();
    formData.append("action", "getContactInfos");
    setLoading(true);
    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setContactInfos(JSON.parse(data[0].contactInformations));
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col mb-10">
      <SettingsHeader>İletişim Bilgilerini Düzenle</SettingsHeader>
      <div className="text-sm font-medium text-myText mb-2">
        <span className="text-ksGreen font-semibold text-lg">
          {t("attention")}{" "}
        </span>
        İletişim Bilgilerinizi eksiksiz doldurduğunuzdan emin olunuz.
      </div>
      {!loading ? (
        <>
          <div className="flex flex-col gap-3.5">
            <div className="grid grid-cols-2 gap-2.5 w-full">
              <div className="flex flex-col ">
                <div className="flex items-center gap-2.5">
                  <header>Tel No</header>
                  <span className="text-gray-400 text-sm font-medium">
                    <span className="text-ksGreen">*</span>Telefon numarasını
                    başında 0 olmadan giriniz.
                  </span>
                </div>
                <div className="relative h-12">
                  <input
                    maxLength={10}
                    type="text"
                    inputMode="numeric"
                    name="telNo"
                    value={contactInfos.telNo}
                    onChange={(e) => changeContactInfos(e)}
                    className="bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-full w-full px-2.5 pl-10 focus:border-ksGreen duration-200 overflow-y-hidden"
                  />
                  <span className="text-titleColor absolute left-2.5 top-1/2 -translate-y-1/2">
                    +90
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <header>E-mail</header>
                <input
                  type="email"
                  placeholder="example123@gmail.com"
                  name="email"
                  value={contactInfos.email}
                  onChange={(e) => changeContactInfos(e)}
                  className="bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-12 px-2.5 focus:border-ksGreen duration-200 overflow-y-hidden"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <header>Adres</header>
              <div className="flex flex-wrap items-center gap-2.5">
                {addressInformations.map((item, index) => (
                  <AddressInput
                    key={index}
                    text={item.shortName}
                    value={item.value}
                    name={item.name}
                    placeholder={item.title}
                    changeFunc={changeContactInfos}
                    index={index}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <header>Google Maps Linkini Giriniz</header>
              <input
                type="text"
                name="googleMapsLink"
                value={contactInfos.googleMapsLink}
                onChange={(e) => changeContactInfos(e)}
                placeholder="Google Maps Lİnki"
                className="bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-12 p-2.5 focus:border-ksGreen duration-200 overflow-y-hidden resize-none"
              />
            </div>
            <div className="flex flex-col">
              <header>Google Maps Iframe Bilgisi</header>
              <textarea
                type="text"
                name="googleMapsIframe"
                value={contactInfos.googleMapsIframe}
                onChange={(e) => changeContactInfos(e)}
                placeholder="Google Maps Iframe Bilgisi"
                className="bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-28 p-2.5 focus:border-ksGreen duration-200 overflow-y-hidden resize-none"
              />
            </div>
            <div className="flex flex-col">
              <header>Sosyal Medya Hesapları</header>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialMediaInformations.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <header className="text-titleColor font-medium">
                      {item.title} Linki
                    </header>
                    <div className="relative">
                      <input
                        type="text"
                        name={item.name}
                        value={item.value}
                        onChange={(e) => changeContactInfos(e)}
                        className="bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-12 p-2.5 focus:border-ksGreen duration-200 overflow-y-hidden pl-8 w-[300px]"
                      />
                      <i
                        className={`${item.icon} absolute left-2.5 top-1/2 -translate-y-1/2 text-myText text-lg`}
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={updateContactInfos}
            className="bg-serviceMenuBack text-myText text-lg font-medium h-14 mt-5 rounded-full border-2 border-solid border-ksGrayTp hover:border-ksGreen hover:text-ksGreen duration-200"
          >
            İletişim Bilgilerini Güncelle
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center h-52 text-4xl bg-preKsBoxBack border-2 border-solid border-ksGreen rounded-lg">
          {t("loading")}
        </div>
      )}
    </div>
  );
}

const AddressInput = ({
  text,
  value,
  changeFunc,
  name,
  index,
  placeholder,
}) => {
  return (
    <div className="flex flex-col relative">
      <input
        value={value}
        name={name}
        onChange={(e) => changeFunc(e)}
        type="text"
        placeholder={`${placeholder} giriniz`}
        className={classNames(
          "bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-12 p-2.5 focus:border-ksGreen duration-200 overflow-y-hidden resize-none w-[300px] pl-12",
          {
            "!pr-12 !pl-2.5": index === 0 || index === 1,
          }
        )}
      />
      <span
        className={classNames(
          "absolute  top-1/2 -translate-y-1/2 text-gray-300",
          {
            "!right-2.5": index === 0 || index === 1,
          },
          {
            "!left-2.5": index !== 0 && index !== 1,
          }
        )}
      >
        {text}
      </span>
    </div>
  );
};
