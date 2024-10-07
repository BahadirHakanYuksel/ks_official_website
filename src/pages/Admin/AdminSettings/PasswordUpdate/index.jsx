import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { updateKsAdminHandle } from "../../../../utils";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function PasswordUpdate() {
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
              {passwordType === "text" ? t("hidePassword") : t("showPassword")}
            </button>
          </div>
          <div className="flex flex-col gap-1 ">
            <header className="text-lg font-medium h-7"></header>
            <button
              onClick={() => setPasswordChangeIsActive(!passwordChangeIsActive)}
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
  );
}

export default PasswordUpdate;

export const SettingsHeader = ({ children }) => {
  return (
    <div className="flex items-center">
      <header className="text-titleColor bg-serviceMenuBack px-5 h-11 flex items-center justify-center font-medium text-xl border-b-2 border-solid border-ksGreen mb-2.5">
        {children}
      </header>
    </div>
  );
};
