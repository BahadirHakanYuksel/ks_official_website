import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

function MessageBox() {
  const { t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  const { act_theme } = useSelector((state) => state.theme);
  let verifyInterval;
  let intervalTime = 120; //s
  const [time, setTime] = useState(intervalTime);

  const formServiceId = import.meta.VITE_FORM_SERVICE_ID;
  const formTemplateId = import.meta.VITE_FORM_TEMPLATE_ID;
  const publicKey = import.meta.VITE_FORM_PUBLIC_KEY;

  const verifyServiceId = import.meta.VITE_VERIFY_SERVICE_ID;
  const verifyTemplateId = import.meta.VITE_VERIFY_TEMPLATE_ID;

  const notifySuccess = () =>
    toast.success(t("messageSent"), {
      theme: act_theme ? act_theme : "colored",
    });

  const notifySuccessVerifyCode = () =>
    toast.success(t("verificationCodeMessageOk"), {
      theme: act_theme ? act_theme : "colored",
    });

  const notifySuccessVerifyCodeAlert = () =>
    toast.error(t("verificationCodeMessageError"), {
      theme: "colored",
    });

  const notifyAlert = () =>
    toast.error(t("failedMessage"), {
      theme: "colored",
    });

  const generateRandomCode = () => {
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10); // 0-9 arasında rastgele bir sayı
    }
    return code;
  };

  const [formKs, setFormKs] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
    verifyCode: "",
  });
  const [sendButtonIsActive, setSendButtonIsActive] = useState(false);
  const [wait, setWait] = useState(false);
  const [waitVerify, setWaitVerify] = useState(false);
  const [verifyCodeActive, setVerifyCodeActive] = useState(false);
  const [verifyCodeBtnActive, setVerifyCodeBtnActive] = useState(false);
  const [systemVerifyCode, setSystemVerifyCode] = useState(false);

  const formUpdate = (e) => {
    const { value, name } = e.target;
    setFormKs({
      ...formKs,
      [name]: value.trim(),
    });
  };

  const form = useRef();

  const sendForm = (e) => {
    e.preventDefault();
    setWait(true);
    emailjs
      .sendForm("service_3gqxd1s", "template_eixy2c8", form.current, {
        publicKey: "qdNFEWRFxqSmJPOSw",
      })
      .then(
        () => {
          setFormKs({
            name: "",
            surname: "",
            email: "",
            message: "",
            verifyCode: "",
          });
          notifySuccess();
          setWait(false);
          setVerifyCodeActive(false);
          setWaitVerify(false);
        },
        (error) => {
          notifyAlert();
          setWait(false);
          setVerifyCodeActive(false);
          setWaitVerify(false);
        }
      );
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const sendVerifyCodeOperations = () => {
    const vcode = generateRandomCode();
    setSystemVerifyCode(vcode);
    setWaitVerify(true);

    emailjs
      .send(
        "service_wuojszq",
        "template_2w7pzrn",
        { verifyCode: vcode, email: formKs.email },
        {
          publicKey: "qdNFEWRFxqSmJPOSw",
        }
      )
      .then(
        () => {
          notifySuccessVerifyCode();
          setWaitVerify(false);
          setVerifyCodeActive(true);
        },
        (error) => {
          notifySuccessVerifyCodeAlert();
          setVerifyCodeActive(false);
          setWaitVerify(false);
          setFormKs({ ...formKs, verifyCode: "" });
        }
      );
  };

  useEffect(() => {
    formKs.name.trim().length > 2 &&
    formKs.surname.trim().length > 1 &&
    formKs.message.trim().length >= 10 &&
    emailRegex.test(formKs.email) &&
    formKs.verifyCode === systemVerifyCode
      ? setSendButtonIsActive(true)
      : setSendButtonIsActive(false);

    emailRegex.test(formKs.email)
      ? setVerifyCodeBtnActive(true)
      : setVerifyCodeBtnActive(false);
  }, [formKs]);

  useEffect(() => {
    if (verifyCodeActive) {
      verifyInterval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          setVerifyCodeActive(false);
          setSystemVerifyCode(false);
          setFormKs({ ...formKs, verifyCode: "" });
          setTime(intervalTime);
        }
      }, 1000);
    } else setTime(intervalTime);

    return () => {
      clearInterval(verifyInterval);
    };
  }, [verifyCodeActive, time]);

  return (
    <form
      ref={form}
      onSubmit={sendForm}
      className={classNames(
        "flex flex-col gap-5 bg-messageBoxBack p-5",
        {
          "!gap-4": isLaptop,
        },
        {
          "!rounded-lg ": isTablet,
        }
      )}
    >
      <div className="absolute">
        <ToastContainer autoClose={5000} limit={3} />
      </div>
      <header
        className={classNames(
          "text-2xl font-medium flex items-center justify-center rounded-sm h-12 bg-ksGreen text-white",
          {
            "!text-xl !h-10": isLaptop,
          }
        )}
      >
        {t("getInTouchWithUs")}
      </header>
      <div
        className={classNames("grid grid-cols-2 gap-2.5", {
          "!grid-cols-1": isMobile,
        })}
      >
        <div className="flex flex-col gap-0.5">
          <header
            className={classNames(
              "text-lg font-medium flex gap-1 items-center",
              {
                "!text-base": isLaptop,
              }
            )}
          >
            <span>{t("yourName")}</span>
            <span
              className={classNames(
                "text-xs font-medium text-gray-400",
                {
                  "!text-green-700": formKs.name.length > 2,
                },
                {
                  "!text-red-700":
                    formKs.name.length > 0 && formKs.name.length < 3,
                }
              )}
            >
              * min 3 {t("chars")}
            </span>
          </header>
          <input
            maxLength={100}
            name="name"
            onChange={(e) => formUpdate(e)}
            value={formKs.name}
            type="text"
            placeholder={t("enterTheName")}
            className={classNames(
              "h-12 rounded-md px-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200",
              {
                "!h-11 !text-sm": isLaptop,
              }
            )}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <header
            className={classNames(
              "text-lg font-medium flex items-center gap-1",
              {
                "!text-base": isLaptop,
              }
            )}
          >
            <span>{t("yourSurname")}</span>
            <span
              className={classNames(
                "text-xs font-medium text-gray-400",
                {
                  "!text-green-700": formKs.surname.length > 1,
                },
                {
                  "!text-red-700":
                    formKs.surname.length > 0 && formKs.surname.length < 2,
                }
              )}
            >
              * min 2 {t("chars")}
            </span>
          </header>
          <input
            maxLength={100}
            name="surname"
            onChange={(e) => formUpdate(e)}
            value={formKs.surname}
            type="text"
            placeholder={t("enterTheSurname")}
            className={classNames(
              "h-12 rounded-md px-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200",
              {
                "!h-11 !text-sm": isLaptop,
              }
            )}
          />
        </div>
      </div>
      <div className="items-center messageEmailDiv">
        <div className="flex flex-col gap-0.5">
          <header
            className={classNames(
              "text-lg font-medium flex items-center gap-1",
              {
                "!text-base": isLaptop,
              }
            )}
          >
            <span>{t("yourEmail")}</span>
            <span
              className={classNames(
                "text-xs font-medium text-gray-400",
                {
                  "!text-green-700":
                    formKs.email.length > 0 && emailRegex.test(formKs.email),
                },
                {
                  "!text-red-700":
                    formKs.email.length > 0 && !emailRegex.test(formKs.email),
                }
              )}
            >
              * {t("example")}123@gmail.com
            </span>
          </header>
          <input
            maxLength={60}
            name="email"
            onChange={(e) => formUpdate(e)}
            value={formKs.email}
            type="email"
            placeholder={t("enterTheEmail")}
            className={classNames(
              "h-12 rounded-md px-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200",
              {
                "!h-11 !text-sm": isLaptop,
              }
            )}
          />
        </div>
        <div className="h-full">
          {!verifyCodeActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-0.5"
            >
              <header
                className={classNames(
                  "text-lg font-medium flex items-center gap-1 pointer-events-none select-none text-transparent",
                  {
                    "!text-base": isLaptop,
                  }
                )}
              >
                a
              </header>
              <button
                type="button"
                onClick={sendVerifyCodeOperations}
                disabled={!verifyCodeBtnActive}
                className={classNames(
                  "h-12 w-full border-2 border-solid rounded-md border-gray-400 bg-gray-950 text-white disabled:opacity-60 disabled:pointer-events-none hover:border-ksGreen",
                  {
                    "!text-sm !pointer-events-none": waitVerify,
                  }
                )}
              >
                {waitVerify ? t("sendingVerificationCode") : t("verifyEmail")}
              </button>
            </motion.div>
          )}
          {verifyCodeActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-0.5"
            >
              <header
                className={classNames(
                  "text-xs h-7 font-medium flex items-center gap-1",
                  {
                    "!text-base": isLaptop,
                  }
                )}
              >
                {t("timeLeft")} :{" "}
                <span
                  className={classNames(
                    "text-ksGreen font-medium text-sm duration-200",
                    {
                      "!text-orange-600": time <= 60,
                    },
                    {
                      "!text-red-600": time <= 20,
                    }
                  )}
                >
                  {time} s
                </span>
              </header>
              <div className="flex flex-col relative">
                <input
                  maxLength={6}
                  name="verifyCode"
                  onChange={(e) => formUpdate(e)}
                  value={formKs.verifyCode}
                  type="text"
                  inputMode="numeric"
                  placeholder={t("enterCode")}
                  className={classNames(
                    "h-12 rounded-md px-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-myText duration-200 overflow-hidden",
                    {
                      "!h-11 !text-sm": isLaptop,
                    },
                    {
                      "!pointer-events-none !opacity-70":
                        formKs.verifyCode === systemVerifyCode,
                    }
                  )}
                />
                <AnimatePresence>
                  {systemVerifyCode === formKs.verifyCode && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-ksGreen text-white flex items-center justify-center rounded-full select-none"
                    >
                      <i className="fa-solid fa-check"></i>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {systemVerifyCode !== formKs.verifyCode &&
                    formKs.verifyCode.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-red-600 text-white flex items-center justify-center rounded-full select-none"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <header
            className={classNames(
              "text-lg font-medium flex items-center gap-1",
              {
                "!text-base": isLaptop,
              }
            )}
          >
            <span>{t("yourMessage")}</span>
            <span
              className={classNames(
                "text-xs font-medium text-gray-400",
                {
                  "!text-green-700": formKs.message.length > 9,
                },
                {
                  "!text-red-700":
                    formKs.message.length > 0 && formKs.message.length < 10,
                }
              )}
            >
              * min 10 {t("chars")}
            </span>
          </header>
          <span
            className={classNames("text-gray-300 font-medium text-sm", {
              "!text-xs": isLaptop,
            })}
          >
            {formKs.message.length}/2000
          </span>
        </div>
        <textarea
          maxLength={2000}
          name="message"
          onChange={(e) => setFormKs({ ...formKs, message: e.target.value })}
          value={formKs.message}
          type="text"
          placeholder={t("enterTheMessage")}
          className={classNames(
            "h-40 rounded-md p-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200 resize-none",
            {
              "!h-36 !text-sm": isLaptop,
            },
            {
              "!h-40 !text-sm": isTablet,
            }
          )}
        />
      </div>
      <button
        disabled={!sendButtonIsActive}
        type="submit"
        className={classNames(
          "bg-messageBoxBack border-2 border-solid border-ksGreen text-ksGreen hover:bg-ksGreen hover:text-white h-12 rounded-full text-lg font-medium duration-200 disabled:pointer-events-none disabled:opacity-50 active:bg-green-600  active:text-white",
          {
            "!pointer-events-none": wait,
          }
        )}
      >
        {wait ? t("sending") : t("send")}
      </button>
    </form>
  );
}

export default MessageBox;
