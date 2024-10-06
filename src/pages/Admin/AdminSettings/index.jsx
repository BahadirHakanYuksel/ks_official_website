import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { openModalBoxHandle, updateKsAdminHandle } from "../../../utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";

function AdminSettings() {
  const [inputData, setInputData] = useState({
    newPassword: "",
    newPasswordAgain: "",
  });

  const { ksAdmin } = useSelector((state) => state.admin);
  const { t } = useTranslation();

  const [passwordChangeIsActive, setPasswordChangeIsActive] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [updatePasswordButtonIsDisabled, setUpdatePasswordButtonIsDisabled] =
    useState(true);

  const newPasswordControl = () => {
    if (
      inputData.newPassword.trim() === inputData.newPasswordAgain.trim() &&
      inputData.newPassword.trim().length >= 6 &&
      inputData.newPassword.trim().length <= 30 &&
      inputData.newPassword.trim() !== ksAdmin.password
    )
      setUpdatePasswordButtonIsDisabled(false);
    else setUpdatePasswordButtonIsDisabled(true);
  };

  const changePasswordType = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const updatePasswordOnDb = async () => {
    const formData = new FormData();
    formData.append("action", "updateAdmin");
    formData.append("email", ksAdmin.email);
    formData.append("password", inputData.newPassword);

    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          setPasswordChangeIsActive(!passwordChangeIsActive);
          updateKsAdminHandle({ ...ksAdmin, password: inputData.newPassword });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    newPasswordControl();
  }, [inputData]);

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
  });

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

  const changeContactInfos = (e) => {
    const { name, value } = e.target;
    setContactInfos({ ...contactInfos, [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      <PageTitle>{t("accountSettings")}</PageTitle>

      <div className="flex flex-col mb-10">
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-2.5">
            <p className="text-base font-medium text-titleColor">
              {t("accountExit")}
            </p>
            <button
              onClick={() =>
                openModalBoxHandle({
                  operation: "logOut",
                  myData: false,
                })
              }
              className="flex items-center justify-center rounded-full border-2 border-solid border-red-700 text-myText font-medium hover:bg-red-600 hover:text-white duration-150 bg-preKsBoxBack h-10 px-5"
            >
              {t("logOut")}
            </button>
          </div>
        </div>
        <SettingsHeader>Parola Yenileme</SettingsHeader>
        <div className="text-sm font-medium text-myText mb-2">
          <span className="text-ksGreen font-semibold text-lg">
            {t("attention")}{" "}
          </span>
          {t("accountSettingsDesc")}
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid adminSettingsGrid gap-2.5">
            <div
              className={classNames("flex flex-col gap-1", {
                "opacity-50": passwordChangeIsActive,
              })}
            >
              <header className="text-lg font-medium">{t("adminEmail")}</header>
              <input
                disabled={true}
                type="text"
                className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90"
                value={ksAdmin.email}
              />
            </div>
            <div
              className={classNames("flex flex-col gap-1 relative", {
                "opacity-50 ": passwordChangeIsActive,
              })}
            >
              <header className="text-lg font-medium">
                {t("adminPassword")}
              </header>
              <input
                disabled={true}
                type={passwordType}
                className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack pr-36 pl-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                value={ksAdmin.password}
                maxLength={30}
              />
              <button
                onClick={changePasswordType}
                className="absolute flex items-center justify-center bg-ksGray text-white right-2.5 top-1/2 h-8 w-32 rounded text-myText"
              >
                {passwordType === "text"
                  ? t("hidePassword")
                  : t("showPassword")}
              </button>
            </div>
            <div className="flex flex-col gap-1 ">
              <header className="text-lg font-medium h-7"></header>
              <button
                onClick={() =>
                  setPasswordChangeIsActive(!passwordChangeIsActive)
                }
                type="text"
                className="w-full h-12 border-2 border-solid border-ksGreen text-ksGreen font-medium rounded-md bg-preKsBoxBack px-2.5 hover:opacity-90 duration-200"
              >
                {passwordChangeIsActive ? t("cancel") : t("updatePassword")}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {passwordChangeIsActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid adminSettingsGrid gap-2.5"
              >
                <div className="flex flex-col gap-1">
                  <header className="text-lg font-medium">
                    {t("newAdminPassword")}
                  </header>
                  <input
                    type={passwordType}
                    className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                    value={inputData.newPassword}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        newPassword: e.target.value,
                      })
                    }
                    maxLength={30}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <header className="text-lg font-medium">
                    {t("newAdminPasswordAgain")}
                  </header>
                  <input
                    type={passwordType}
                    className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                    value={inputData.newPasswordAgain}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        newPasswordAgain: e.target.value,
                      })
                    }
                    maxLength={30}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <header className="text-lg font-medium h-7"></header>
                  <button
                    disabled={updatePasswordButtonIsDisabled}
                    onClick={updatePasswordOnDb}
                    type="text"
                    className="w-full h-12 border-2 border-solid border-ksGreen font-medium rounded-md px-2.5 bg-ksGreen text-white duration-200 disabled:border-ksGrayTp disabled:pointer-events-none disabled:bg-preKsBoxBack disabled:text-ksGreen hover:bg-green-700"
                  >
                    {t("saveNewPassword")}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col mb-10">
        <SettingsHeader>İletişim Bilgilerini Düzenle</SettingsHeader>
        <div className="text-sm font-medium text-myText mb-2">
          <span className="text-ksGreen font-semibold text-lg">
            {t("attention")}{" "}
          </span>
          İletişim Bilgilerinizi eksiksiz doldurduğunuzdan emin olunuz.
        </div>
        <div className="flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <div className="flex flex-col">
              <header>Tel No</header>
              <input
                maxLength={11}
                type="text"
                inputMode="numeric"
                placeholder="0000 000 00 00"
                name="telNo"
                value={contactInfos.telNo}
                onChange={(e) => changeContactInfos(e)}
                className="bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-12 px-2.5 focus:border-ksGreen duration-200 overflow-y-hidden"
              />
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
          <div className="flex flex-col">
            <header>Google Maps Iframe Bilgisi</header>
            <textarea
              type="text"
              name="googleMapsIframe"
              value={contactInfos.googleMapsIframe}
              onChange={(e) => changeContactInfos(e)}
              placeholder="Google Maps Iframe Bilgisi"
              className="bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md h-24 p-2.5 focus:border-ksGreen duration-200 overflow-y-hidden resize-none"
            />
          </div>
        </div>
        <button className="bg-serviceMenuBack text-myText text-lg font-medium h-14 mt-5 rounded-full border-2 border-solid border-ksGrayTp hover:border-ksGreen hover:text-ksGreen duration-200">
          İletişim Bilgilerini Kaydet
        </button>
      </div>
    </motion.div>
  );
}

export default AdminSettings;

const SettingsHeader = ({ children }) => {
  return (
    <div className="flex items-center">
      <header className="text-titleColor bg-serviceMenuBack px-5 h-11 flex items-center justify-center font-medium text-xl border-b-2 border-solid border-ksGreen mb-2.5">
        {children}
      </header>
    </div>
  );
};

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
