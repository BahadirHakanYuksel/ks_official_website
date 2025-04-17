import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateKsAdminHandle } from "../../../utils";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function LoginPage() {
  const navigate = useNavigate();
  const [pointAnimCount, setPointAnimCount] = useState(0);
  const pointAnimArr = [".", "..", "..."];
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [controlMessage, setControlMessage] = useState({
    checking: false,
    isCorrect: null,
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const inputsControl = () => {
    if (
      validateEmail(loginData.email.trim()) &&
      loginData.password.trim().length >= 6 &&
      loginData.password.trim().length < 30
    )
      setLoginButtonDisabled(false);
    else setLoginButtonDisabled(true);
  };
  useEffect(() => {
    inputsControl();
  }, [loginData]);

  const loginAdminPanel = async (e) => {
    e.preventDefault();
    setControlMessage({ checking: true, isCorrect: null });
    setLoginButtonDisabled(true);
    await getUsers();
  };

  useEffect(() => {
    let interval;
    if (
      controlMessage.isCorrect === null ||
      controlMessage.isCorrect === true
    ) {
      interval = setInterval(() => {
        setPointAnimCount((count) => (count < 2 ? count + 1 : 0));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [controlMessage.isCorrect]);

  const getUsers = async () => {
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const login_ks = import.meta.env.VITE_REQUEST_LOGIN_KS;

    const formData = new FormData();
    formData.append("action", login_ks);
    formData.append("email", loginData.email.trim());
    formData.append("password", loginData.password.trim());
    let isOK = false;

    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            if (data.status === "success") {
              setControlMessage({ ...controlMessage, isCorrect: true });
              setTimeout(() => {
                updateKsAdminHandle(data.user);
                localStorage.setItem("ks_user", data.user.id);
                setLoginButtonDisabled(false);
              }, 1500);
            } else {
              setControlMessage({ ...controlMessage, isCorrect: false });
              setLoginButtonDisabled(false);
            }
          }, 2500);

          // const active_admin = data.find(
          //   (user) =>
          //     user.email === loginData.email.trim() &&
          //     user.password === loginData.password.trim()
          // );

          // setTimeout(() => {
          //   if (
          //     active_admin !== null &&
          //     active_admin !== undefined &&
          //     active_admin !== ""
          //   ) {
          //     setControlMessage({ ...controlMessage, isCorrect: true });
          //     setTimeout(() => {
          //       updateKsAdminHandle(active_admin);
          //       localStorage.setItem("ks_user", active_admin.id);
          //       setLoginButtonDisabled(false);
          //     }, 1500);
          //   } else {
          //     setControlMessage({ ...controlMessage, isCorrect: false });
          //     setLoginButtonDisabled(false);
          //   }
          // }, 2500);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log("cm : ", controlMessage);
  // }, [controlMessage.isCorrect]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-backColor">
      <form
        onSubmit={loginAdminPanel}
        className="w-[450px] h-auto rounded-md bg-preKsBoxBack shadow-lg flex flex-col p-3 gap-2.5 relative"
      >
        <header className="text-3xl font-medium flex items-center justify-center text-titleColor mb-2.5">
          Admin Paneli Girişi
        </header>
        <div className="flex flex-col gap-1">
          <header className="text-base font-medium text-titleColor">
            E-Mail
          </header>
          <input
            type="email"
            maxLength={120}
            className="w-full bg-preKsBoxBack h-10 border-2 border-solid border-ksGrayTp focus:border-ksGreen text-sm font-medium px-2 rounded-md shadow-lg duration-200"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <header className="text-base font-medium text-titleColor">
            Parola
          </header>
          <input
            type="password"
            maxLength={32}
            className="w-full bg-preKsBoxBack h-10 border-2 border-solid border-ksGrayTp focus:border-ksGreen text-sm font-medium px-2 rounded-md shadow-lg duration-200"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        {controlMessage.checking && (
          <>
            {controlMessage.isCorrect === null ? (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-myText font-medium text-sm"
              >
                Kontrol Ediliyor
                <span className="text-green-500">
                  {pointAnimArr[pointAnimCount]}
                </span>
              </motion.p>
            ) : (
              <>
                {controlMessage.isCorrect ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 font-medium text-base"
                  >
                    Giriş Başarılı
                    <span className="text-myText">
                      , Yönlendiriliyorsunuz{" "}
                      <span className="text-green-500">
                        {pointAnimArr[pointAnimCount]}
                      </span>
                    </span>
                  </motion.p>
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 font-medium text-sm"
                  >
                    Giriş Bilgileriniz Hatalı!
                  </motion.p>
                )}
              </>
            )}
          </>
        )}

        <button
          onClick={() =>
            setControlMessage({ ...controlMessage, checking: true })
          }
          disabled={loginButtonDisabled}
          type="submit"
          className="text-lg font-medium bg-ksGray hover:bg-ksGreen active:bg-preKsBoxIcon duration-200 text-white h-12 rounded-md mt-2 disabled:pointer-events-none disabled:opacity-80"
        >
          Giriş Yap
        </button>
        <button
          onClick={() => navigate("/")}
          type="button"
          className="absolute h-8 border-ksGrayTp bg-backColor text-titleColor font-medium text-sm w-24 rounded-md -top-4 right-0 hover:border-ksGreen hover:text-ksGreen border-2 border-solid"
        >
          Anasayfa
        </button>
        <header className="absolute left-1/2 -translate-x-1/2 -bottom-8 flex items-center h-8 text-ksGreen font-medium text-base">
          Katılım Sigortası
        </header>
      </form>
    </div>
  );
}

export default LoginPage;
