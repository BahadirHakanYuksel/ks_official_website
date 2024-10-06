import { useEffect, useRef, useState } from "react";
import Supporter from "../../../Team/Supporter";
import classNames from "classnames";
import PageTitle from "../../../../components/PageTitle";

export default function EditTeam({ operationId, edit_data }) {
  // operationId === 1 => Add Supporter
  // operationId === 2 => Edit Supporter

  const [supporterInformations, setSupporterInformations] = useState({
    name: "",
    surname: "",
    description: "",
    profile_img_url: "",
    socialMediaLinks: [
      {
        name: "E-mail",
        link: "",
        id: 0,
      },
      { name: "Instagram", link: "", id: 1 },
      { name: "Facebook", link: "", id: 2 },
      { name: "X", link: "", id: 3 },
      { name: "Linkedin", link: "", id: 4 },
      { name: "Youtube", link: "", id: 5 },
    ],
  });

  const socialMediaIcons = [
    "fa-envelope",
    "fa-instagram",
    "fa-facebook",
    "fa-x-twitter",
    "fa-linkedin",
    "fa-youtube",
  ];

  const [activeSocialMediaLink, setActiveSocialMediaLink] = useState(0);
  const [seeProfileImage, setSeeProfileImage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [smLinkIsOk, setSmLinkIsOk] = useState(false);

  const changeInformations = (e) => {
    const { name, value } = e.target;
    setSupporterInformations({
      ...supporterInformations,
      [name]: value,
    });
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setSeeProfileImage(img);
    setSupporterInformations({
      ...supporterInformations,
      profile_img_url: file,
    });
  };

  useEffect(() => {
    const { name, surname } = supporterInformations;
    name !== "" && surname !== ""
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [supporterInformations.name, supporterInformations.surname]);

  const saveCounsellor = async () => {
    const counsellorDataRequest = new FormData();
    counsellorDataRequest.append("action", "team");
    let counsellorId = "######";
    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: counsellorDataRequest,
      })
        .then((res) => res.json())
        .then((db) => {
          counsellorId = generateUniqueCode(db.map((c) => c.counsellor_id));
        });
    } catch (error) {
      console.error("Error:", error);
    }

    const formData = new FormData();
    formData.append("action", "add-counsellor");
    formData.append("counsellor_id", counsellorId);
    formData.append("counsellor_name", supporterInformations.name);
    formData.append("counsellor_surname", supporterInformations.surname);
    formData.append("counsellor_dsc", supporterInformations.description);
    formData.append(
      "counsellor_img_url",
      supporterInformations.profile_img_url === ""
        ? null
        : supporterInformations.profile_img_url
    );
    formData.append(
      "counsellor_links",
      JSON.stringify(supporterInformations.socialMediaLinks)
    );

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          setSupporterInformations({
            name: "",
            surname: "",
            description: "",
            profile_img_url: "",
            socialMediaLinks: [
              { name: "E-mail", link: "", id: 0 },
              { name: "Instagram", link: "", id: 1 },
              { name: "Facebook", link: "", id: 2 },
              { name: "Twitter", link: "", id: 3 },
              { name: "Linkedin", link: "", id: 4 },
              { name: "Youtube", link: "", id: 5 },
            ],
          });
          setSeeProfileImage(false);
          setButtonDisabled(true);
          alert("Danışman başarıyla eklendi.");
        });
    } catch (error) {
      console.error("Error:");
    }
  };

  const buttonActions = () => {
    operationId === 1 && saveCounsellor();
    operationId === 2 && updateCounsellor();
  };

  const updateCounsellor = async () => {
    const formData = new FormData();
    formData.append("action", "edit-counsellor");
    formData.append("counsellor_id", supporterInformations.id);
    formData.append("counsellor_name", supporterInformations.name);
    formData.append("counsellor_surname", supporterInformations.surname);
    formData.append("counsellor_dsc", supporterInformations.description);
    formData.append(
      "counsellor_img_url",
      supporterInformations.profile_img_url
    );
    formData.append(
      "counsellor_links",
      JSON.stringify(supporterInformations.socialMediaLinks)
    );

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          alert("Danışman başarıyla güncellendi.");
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function generateUniqueCode(existingCodes) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    // 6 karakterlik rastgele bir kod oluştur
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    // Kodun benzersiz olup olmadığını kontrol et
    if (existingCodes.includes(code)) {
      return generateUniqueCode(existingCodes); // Aynıysa yeniden üret
    }

    return code;
  }

  useEffect(() => {
    if (edit_data) {
      setSupporterInformations({
        name: edit_data.counsellor_name,
        surname: edit_data.counsellor_surname,
        description: edit_data.counsellor_dsc,
        profile_img_url: edit_data.counsellor_img_url,
        socialMediaLinks:
          edit_data.counsellor_links !== null
            ? JSON.parse(edit_data.counsellor_links)
            : [
                { name: "E-mail", link: "", id: 0 },
                { name: "Instagram", link: "", id: 1 },
                { name: "Facebook", link: "", id: 2 },
                { name: "Twitter", link: "", id: 3 },
                { name: "Linkedin", link: "", id: 4 },
                { name: "Youtube", link: "", id: 5 },
              ],
        id: edit_data.counsellor_id,
      });

      setSeeProfileImage(edit_data.counsellor_img_url);
    }
  }, [edit_data]);

  const smLinkRef = useRef();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="w-full flex flex-col gap-12">
      {operationId === 2 && <PageTitle>Danışman Düzenle</PageTitle>}
      <div className="w-full flex gap-5 flex-wrap justify-center items-center">
        <div className="w-[900px] h-[420px] grid grid-cols-2">
          <div className="w-full  bg-preKsBoxBack border-2 border-solid border-gray-500 border-r-0 rounded-lg rounded-r-none p-3 h-full relative">
            <header className="text-lg font-medium absolute h-10 flex items-center justify-center -top-10 left-0">
              {operationId === 1
                ? "Yeni Danışman Ekle"
                : "Danışman Bilgilerini Düzenle"}
            </header>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="flex flex-col gap-1.5">
                <header className="text-base font-medium text-gray-400 flex">
                  Danışman Resmi
                </header>
                <div className="w-[120px] h-[120px] rounded-lg bg-backColor flex items-center justify-center ">
                  {!seeProfileImage ? (
                    <label
                      htmlFor="profile_img"
                      className="w-24 h-24 rounded-lg border-2 border-solid border-gray-400 bg-preKsBoxBack hover:bg-ksGreen text-ksGreen flex items-center justify-center hover:text-white duration-300 hover:border-ksGreen cursor-pointer"
                    >
                      <i className="fa-solid fa-plus text-4xl"></i>
                      <input
                        onChange={(e) => updateImage(e)}
                        className="hidden"
                        id="profile_img"
                        type="file"
                      />
                    </label>
                  ) : (
                    <div>
                      <img
                        className="w-28 h-28 rounded-md"
                        src={
                          edit_data
                            ? `https://katilimsigortacisi.com/${seeProfileImage}`
                            : seeProfileImage
                        }
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2.5 h-full">
                <p className="text-sm">
                  {supporterInformations.profile_img_url !== ""
                    ? "Profil resmi başarıyla seçildi"
                    : "Profil Resmi Yok!"}
                </p>
                <div className="flex">
                  <label
                    htmlFor="profile_img_2"
                    className="bg-indigo-500 h-10 px-2.5 rounded-lg flex items-center justify-center text-sm gap-1.5 hover:bg-blue-500 duration-200 text-white font-medium cursor-pointer"
                  >
                    <span>
                      {seeProfileImage
                        ? "Resmi Değiştir"
                        : "Danışman Resmi Ekleyin"}
                    </span>
                    {!seeProfileImage && (
                      <span className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-xs">
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    )}
                    <input
                      onChange={(e) => updateImage(e)}
                      className="hidden"
                      id="profile_img_2"
                      type="file"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col w-full">
                <header className="text-base font-medium text-gray-400 flex">
                  Danışman Adı <span className="text-ksGreen">*</span>
                </header>
                <input
                  className="text-myText border-2 border-solid border-gray-400 focus:border-ksGreen duration-200 h-10 rounded bg-transparent px-2.5"
                  type="text"
                  name="name"
                  value={supporterInformations.name}
                  onChange={(e) => changeInformations(e)}
                />
              </div>
              <div className="flex flex-col w-full">
                <header className="text-base font-medium text-gray-400 flex">
                  Danışman Soyadı <span className="text-ksGreen">*</span>
                </header>
                <input
                  className="text-myText border-2 border-solid border-gray-400 focus:border-ksGreen duration-200 h-10 rounded bg-transparent px-2.5"
                  type="text"
                  name="surname"
                  value={supporterInformations.surname}
                  onChange={(e) => changeInformations(e)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full mt-1.5">
              <header className="text-base font-medium text-gray-400 flex">
                Açıklama
              </header>
              <textarea
                className="text-myText border-2 border-solid border-gray-400 focus:border-ksGreen duration-200 h-40 resize-none rounded bg-transparent p-2.5"
                type="text"
                name="description"
                value={supporterInformations.description}
                onChange={(e) => changeInformations(e)}
              />
            </div>
          </div>
          <div className="w-full  bg-preKsBoxBack border-2 border-solid border-gray-500 border-l-0 rounded-lg rounded-l-none p-3 h-full flex flex-col gap-2.5">
            <header className="text-lg font-medium">
              Sosyal Medya Hesapları
            </header>
            <div className="flex gap-5 items-center">
              {socialMediaIcons.map((icon, i) => (
                <button
                  onClick={() => {
                    setActiveSocialMediaLink(i);
                    smLinkRef.current.focus();
                  }}
                  className={classNames(
                    "border-2 border-solid border-gray-300 w-11 h-11 rounded-lg flex items-center justify-center text-myText hover:bg-gray-700 hover:text-white duration-200 mt-2.5 text-lg pointer-events-auto relative",
                    {
                      "!scale-110 !text-2xl !bg-ksGreen !text-white !border-ksGreen":
                        i === activeSocialMediaLink,
                    },
                    {
                      "!border-blue-500 !text-white":
                        supporterInformations.socialMediaLinks[i].link !== "" &&
                        i !== activeSocialMediaLink,
                    }
                  )}
                >
                  <i
                    className={
                      i === 0 ? `fa-solid ${icon}` : `fa-brands ${icon}`
                    }
                  ></i>
                  {i !== 0 &&
                    supporterInformations.socialMediaLinks[i].link !== "" &&
                    supporterInformations.socialMediaLinks[i].link.includes(
                      `${supporterInformations.socialMediaLinks[
                        i
                      ].name.toLowerCase()}.com`
                    ) && (
                      <div className="absolute w-5 h-5 flex items-center justify-center pointer-events-none rounded-full bg-blue-500 text-white -right-2.5 -top-2.5 text-[10px]">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                  {i === 0 &&
                    supporterInformations.socialMediaLinks[i].link !== "" &&
                    emailRegex.test(
                      supporterInformations.socialMediaLinks[i].link
                    ) && (
                      <div className="absolute w-5 h-5 flex items-center justify-center pointer-events-none rounded-full bg-blue-500 text-white -right-2.5 -top-2.5 text-[10px]">
                        <i className="fa-solid fa-check"></i>
                      </div>
                    )}
                </button>
              ))}
            </div>
            <div className="flex flex-col w-full">
              <header className="flex">
                {
                  supporterInformations.socialMediaLinks[activeSocialMediaLink]
                    .name
                }{" "}
                {activeSocialMediaLink === 0 ? "Adresi" : "Linki"}
              </header>
              <input
                ref={smLinkRef}
                className="border-2 border-solid border-gray-400 bg-transparent focus:border-ksGreen duration-200 h-12 rounded px-2.5 w-full"
                type="text"
                name="link"
                value={
                  supporterInformations.socialMediaLinks[activeSocialMediaLink]
                    .link
                }
                onChange={(e) => {
                  const { value } = e.target;
                  setSupporterInformations({
                    ...supporterInformations,
                    socialMediaLinks:
                      supporterInformations.socialMediaLinks.map((sl) =>
                        sl.id === activeSocialMediaLink
                          ? { ...sl, link: value }
                          : sl
                      ),
                  });
                }}
              />
            </div>
            <button
              onClick={buttonActions}
              disabled={buttonDisabled}
              className="flex bg-ksGreen text-white w-full h-12 justify-center items-center rounded-full text-lg font-medium mt-5 hover:bg-green-600 duration-200 disabled:opacity-70 disabled:pointer-events-none"
            >
              {operationId === 1 ? "Kaydet" : "Güncelle"}
            </button>
            <div className="bg-gray-600 w-full p-3 rounded-lg mt-2.5">
              <header className="text-lg font-medium text-white">
                Bilgilendirme
              </header>
              <p className="text-white text-sm">
                <span className="text-ksGreen font-medium text-lg">*</span> | Bu
                alanlar zorunludur.
              </p>
            </div>
          </div>
        </div>
        <Supporter
          trying={operationId !== 2 ? true : false}
          name={supporterInformations.name}
          surname={supporterInformations.surname}
          description={supporterInformations.description}
          social_links={supporterInformations.socialMediaLinks}
          img_url={seeProfileImage}
        />
      </div>
    </div>
  );
}
