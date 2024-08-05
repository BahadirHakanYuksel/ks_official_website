import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";

function MessageBox() {
  const { t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  const [formKs, setFormKs] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [sendButtonIsActive, setSendButtonIsActive] = useState(false);

  const formUpdate = (e) => {
    const { value, name } = e.target;
    setFormKs({
      ...formKs,
      [name]: value,
    });
  };

  const sendForm = (e) => {
    e.preventDefault();
    setFormKs({
      name: "",
      surname: "",
      email: "",
      message: "",
    });
    console.log(formKs);
  };

  useEffect(() => {
    formKs.name.trim().length > 2 &&
    formKs.surname.trim().length > 1 &&
    formKs.message.trim().length >= 10
      ? setSendButtonIsActive(true)
      : setSendButtonIsActive(false);
  }, [formKs]);

  return (
    <form
      onSubmit={sendForm}
      className={classNames("flex flex-col gap-5 bg-messageBoxBack p-5", {
        "!gap-4": isLaptop,
      })}
    >
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
            className={classNames("text-lg font-medium", {
              "!text-base": isLaptop,
            })}
          >
            {t("yourName")}
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
            className={classNames("text-lg font-medium", {
              "!text-base": isLaptop,
            })}
          >
            {t("yourSurname")}
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
      <div className="flex flex-col gap-0.5">
        <header
          className={classNames("text-lg font-medium", {
            "!text-base": isLaptop,
          })}
        >
          {t("yourEmail")}
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
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <header
            className={classNames("text-lg font-medium", {
              "!text-base": isLaptop,
            })}
          >
            {t("yourMessage")}
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
          onChange={(e) => formUpdate(e)}
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
        className="bg-messageBoxBack border-2 border-solid border-ksGreen text-ksGreen hover:bg-ksGreen hover:text-white h-12 rounded-full text-lg font-medium duration-200 disabled:pointer-events-none disabled:opacity-50"
      >
        {t("send")}
      </button>
    </form>
  );
}

export default MessageBox;
