import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function AdminSettings() {
  const [inputData, setInputData] = useState({
    password: "1234567",
    newPassword: "",
    newPasswordAgain: "",
  });

  const [passwordChangeIsActive, setPasswordChangeIsActive] = useState(false);

  return (
    <div className="flex flex-col">
      <header className="w-full h-16 text-2xl font-medium flex items-center justify-center rounded-sm bg-ksGreen text-white mb-10">
        Hesap Ayarları
      </header>
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
              value={"bhy123@gmail.com"}
            />
          </div>
          <div
            className={classNames("flex flex-col gap-1", {
              "opacity-50": passwordChangeIsActive,
            })}
          >
            <header className="text-lg font-medium">Admin Parola</header>
            <input
              disabled={true}
              type="text"
              className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
              value={inputData.password}
            />
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
                  type="text"
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                  value={inputData.newPassword}
                  onChange={(e) =>
                    setInputData({ ...inputData, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <header className="text-lg font-medium">
                  Yeni Admin Parola Tekrar
                </header>
                <input
                  type="text"
                  className="w-full h-12 border-2 border-solid border-ksGrayTp rounded-md bg-preKsBoxBack px-2.5 disabled:pointer-events-none disabled:opacity-90 focus:border-ksGreen"
                  value={inputData.newPasswordAgain}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      newPasswordAgain: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <header className="text-lg font-medium h-7"></header>
                <button
                  onClick={() =>
                    setPasswordChangeIsActive(!passwordChangeIsActive)
                  }
                  type="text"
                  className="w-full h-12 border-2 border-solid border-ksGreen text-ksGreen font-medium rounded-md bg-preKsBoxBack px-2.5 hover:bg-ksGreen hover:text-white duration-200"
                >
                  Yeni Parolayı Kaydet
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdminSettings;
