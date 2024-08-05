import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateKsAdminHandle } from "../../../utils";

function LoginPage() {
  const navigate = useNavigate();
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
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

  const loginAdminPanel = (e) => {
    e.preventDefault();
  };

  const getUsers = async () => {
    const formData = new FormData();
    formData.append("action", "auth");
    try {
      await fetch("https://katilimsigortacisi.com/php-admin/", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          data.forEach((user) => {
            if (
              loginData.email.trim() === user.email &&
              loginData.password.trim() === user.password
            ) {
              updateKsAdminHandle(user);
              localStorage.setItem("ks_user", user.id);
            } else {
              setUserAction(false);
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-backColor">
      <form
        onSubmit={loginAdminPanel}
        className="w-[450px] h-auto rounded-md bg-preKsBoxBack shadow-lg flex flex-col p-3 gap-2.5 relative"
      >
        <header className="text-3xl font-medium flex items-center justify-center text-ksGray mb-2.5">
          Admin Paneli Girişi
        </header>
        <div className="flex flex-col gap-1">
          <header className="text-base font-medium text-titleColor">
            E-Mail
          </header>
          <input
            type="email"
            maxLength={120}
            className="w-full h-10 border-2 border-solid border-ksGrayTp focus:border-ksGreen text-sm font-medium px-2 rounded-md shadow-lg duration-200"
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
            className="w-full h-10 border-2 border-solid border-ksGrayTp focus:border-ksGreen text-sm font-medium px-2 rounded-md shadow-lg duration-200"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <button
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
