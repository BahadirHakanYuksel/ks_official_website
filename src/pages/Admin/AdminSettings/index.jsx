import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { openModalBoxHandle, updateKsAdminHandle } from "../../../utils";
import { useSelector } from "react-redux";

function AdminSettings() {
  const [inputData, setInputData] = useState({
    newPassword: "",
    newPasswordAgain: "",
  });

  const { ksAdmin } = useSelector((state) => state.admin);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      <header className="w-full h-16 text-2xl font-medium flex items-center justify-center rounded-sm bg-ksGreen text-white mb-10">
        Hesap Ayarları
      </header>
      <div className="flex justify-end items-center">
        <div className="flex items-center gap-2.5">
          <p className="text-base font-medium text-titleColor">
            Hesaptan Çıkış{" "}
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
            Çıkış Yap
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid adminSettingsGrid gap-2.5">
          <div
            className={classNames("flex flex-col gap-1", {
              "opacity-50": passwordChangeIsActive,
            })}
          >
            <header className="text-lg font-medium">Admin E-Posta</header>
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
            <header className="text-lg font-medium">Admin Parola</header>
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
              {passwordType === "text" ? "Parolayı Gizle" : "Parolayı Göster"}
            </button>
          </div>
          <div className="flex flex-col gap-1 ">
            <header className="text-lg font-medium h-7"></header>
            <button
              onClick={() => setPasswordChangeIsActive(!passwordChangeIsActive)}
              type="text"
              className="w-full h-12 border-2 border-solid border-ksGreen text-ksGreen font-medium rounded-md bg-preKsBoxBack px-2.5 hover:opacity-90 duration-200"
            >
              {passwordChangeIsActive ? "İptal" : "Şifreyi Güncelle"}
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
                  Yeni Admin Parola
                </header>
                <input
                  type={passwordType}
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                  value={inputData.newPassword}
                  onChange={(e) =>
                    setInputData({ ...inputData, newPassword: e.target.value })
                  }
                  maxLength={30}
                />
              </div>
              <div className="flex flex-col gap-1">
                <header className="text-lg font-medium">
                  Yeni Admin Parola Tekrar
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
                  Yeni Parolayı Kaydet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default AdminSettings;
