import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { updateKsAdminHandle } from "../../../../utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../../../Context";

function PasswordUpdate() {
  const [inputData, setInputData] = useState({
    newPassword: "",
    newPasswordAgain: "",
    newEmail: "",
    newEmailAgain: "",
  });

  const { ksAdmin } = useSelector((state) => state.admin);
  const { t } = useTranslation();
  const { isMobile } = useResponsiveData();

  const [passwordChangeIsActive, setPasswordChangeIsActive] = useState(false);
  const [emailChangeIsActive, setEmailChangeIsActive] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [updatePasswordButtonIsDisabled, setUpdatePasswordButtonIsDisabled] =
    useState(true);
  const [updateEmailButtonIsDisabled, setUpdateEmailButtonIsDisabled] =
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
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const update_admin = import.meta.env.VITE_REQUEST_ADMIN_KS_UPDATE;
    const formData = new FormData();
    formData.append("action", update_admin);
    formData.append("email", ksAdmin.email);
    formData.append("password", inputData.newPassword);

    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            alert("Parola başarıyla değiştirildi.");
            setPasswordChangeIsActive(!passwordChangeIsActive);
            updateKsAdminHandle({
              ...ksAdmin,
              password: inputData.newPassword,
            });
          } else {
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateEmailOnDb = async () => {
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const update_admin = import.meta.env.VITE_REQUEST_ADMIN_KS_UPDATE;
    const formData = new FormData();
    formData.append("action", "email_update");
    formData.append("email", inputData.newEmail);
    formData.append("id", localStorage.getItem("ks_user"));

    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert("Email başarıyla değiştirildi.");
          setEmailChangeIsActive(!emailChangeIsActive);
          updateKsAdminHandle({ ...ksAdmin, email: inputData.newEmail });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeInputs = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const newEmailControl = () => {
    // regex control for email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (
      emailRegex.test(inputData.newEmail.trim()) &&
      inputData.newEmail.trim() === inputData.newEmailAgain.trim()
    )
      setUpdateEmailButtonIsDisabled(false);
    else setUpdateEmailButtonIsDisabled(true);
  };

  useEffect(() => {
    newPasswordControl();
    newEmailControl();
  }, [inputData]);

  return (
    <div className="flex flex-col mb-10">
      <SettingsHeader>Parola Yenileme</SettingsHeader>
      <div className="text-sm font-medium text-myText mb-2">
        <span className="text-ksGreen font-semibold text-lg">
          {t("attention")}{" "}
        </span>
        {t("accountSettingsDesc")}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2.5">
          <div
            className={classNames("flex flex-col gap-1 min-w-[280px]", {
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
          {/* <div className="flex flex-col gap-1 ">
            <header
              className={classNames("text-lg font-medium h-7", {
                "!h-3": isMobile,
              })}
            ></header>
            <button
              onClick={() => setEmailChangeIsActive(!emailChangeIsActive)}
              type="text"
              className="w-full h-12 border-2 border-solid border-ksGreen text-ksGreen font-medium rounded-md bg-preKsBoxBack px-2.5 hover:opacity-90 duration-200"
            >
              {emailChangeIsActive ? t("cancel") : "E-posta Değiştir"}
            </button>
          </div> */}
          <div className="flex flex-col gap-1 ">
            <header
              className={classNames("text-lg font-medium h-7", {
                "!h-3": isMobile,
              })}
            ></header>
            <button
              onClick={() => setPasswordChangeIsActive(!passwordChangeIsActive)}
              type="text"
              className="w-full h-12 border-2 border-solid border-ksGreen text-ksGreen font-medium rounded-md bg-preKsBoxBack px-2.5 hover:opacity-90 duration-200"
            >
              {passwordChangeIsActive ? t("cancel") : t("updatePassword")}
            </button>
          </div>
        </div>
        {/* <AnimatePresence>
          {emailChangeIsActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid adminSettingsGrid gap-2.5"
            >
              <div className="flex flex-col gap-1 relative">
                <header className="text-lg font-medium">
                  Yeni E-posta Adresi
                </header>
                <input
                  id="newEmail"
                  name="newEmail"
                  type="email"
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                  value={inputData.newEmail}
                  onChange={handleChangeInputs}
                  maxLength={30}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1">
                <header className="text-lg font-medium">
                  Yeni e-posta adresi tekrar
                </header>
                <input
                  name="newEmailAgain"
                  type="email"
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                  value={inputData.newEmailAgain}
                  onChange={handleChangeInputs}
                  maxLength={30}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1">
                <header
                  className={classNames("text-lg font-medium h-7", {
                    "!h-3": isMobile,
                  })}
                ></header>
                <button
                  disabled={updateEmailButtonIsDisabled}
                  onClick={updateEmailOnDb}
                  type="text"
                  className="w-full h-12 border-2 border-solid border-ksGreen font-medium rounded-md px-2.5 bg-ksGreen text-white duration-200 disabled:border-ksGrayTp disabled:pointer-events-none disabled:bg-preKsBoxBack disabled:text-ksGreen hover:bg-green-700"
                >
                  Yeni Emaili kaydet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
        <AnimatePresence>
          {passwordChangeIsActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid adminSettingsGrid gap-2.5"
            >
              <div className="flex flex-col gap-1 relative">
                <header className="text-lg font-medium">
                  {t("newAdminPassword")}
                </header>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={passwordType}
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                  value={inputData.newPassword}
                  onChange={handleChangeInputs}
                  maxLength={30}
                  autoComplete="off"
                />
                <button
                  title={
                    passwordType === "text"
                      ? t("hidePassword")
                      : t("showPassword")
                  }
                  onClick={changePasswordType}
                  className="absolute flex items-center justify-center bg-ksGray text-green-200 right-2.5 top-1/2 h-8 w-8 rounded text-sm"
                >
                  {passwordType === "text" ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <header className="text-lg font-medium">
                  {t("newAdminPasswordAgain")}
                </header>
                <input
                  name="newPasswordAgain"
                  type={passwordType}
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                  value={inputData.newPasswordAgain}
                  onChange={handleChangeInputs}
                  maxLength={30}
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col gap-1">
                <header
                  className={classNames("text-lg font-medium h-7", {
                    "!h-3": isMobile,
                  })}
                ></header>
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
  );
}

export default PasswordUpdate;

export const SettingsHeader = ({ children }) => {
  const { isMobile } = useResponsiveData();
  return (
    <div className="flex items-center">
      <header
        className={classNames(
          "text-titleColor bg-serviceMenuBack px-5 h-11 flex items-center justify-center font-medium text-xl border-b-2 border-solid border-ksGreen mb-2.5",
          {
            "!text-base": isMobile,
          }
        )}
      >
        {children}
      </header>
    </div>
  );
};
