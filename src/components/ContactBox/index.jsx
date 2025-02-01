import { useTranslation } from "react-i18next";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";
import { useEffect, useState } from "react";

function ContactBox() {
  const { i18n, t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  const [contactInfos, setContactInfos] = useState(false);
  const [address, setAddress] = useState(undefined);
  const [iframeLink, setIframeLink] = useState(undefined);
  const [telNoText, setTelNoText] = useState(undefined);

  const request_url = import.meta.env.VITE_REQUEST_URL;

  const getContactInfos = async () => {
    const formData = new FormData();
    formData.append("action", "getContactInfos");

    try {
      await fetch(request_url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((db) => {
          db.forEach((element) => {
            if (element.id === 0) {
              const data = JSON.parse(element.contactInformations);
              setContactInfos(data);

              let hood =
                data.neighborhood !== ""
                  ? `${data.neighborhood} ${t("hood")}`
                  : "";
              let street =
                data.street !== "" ? `${data.street} ${t("street")}` : "";
              let no = data.no !== "" ? `No:${data.no}` : "";
              let apartament =
                data.apartment !== "" ? `Apt:${data.apartment}` : "";
              let district = data.district !== "" ? `${data.district}/` : "";
              let city = data.city !== "" ? `${data.city}` : "";

              setIframeLink(
                data.googleMapsIframe
                  .trim()
                  .replace("{", "")
                  .replace("}", "")
                  .replace("referrerpolicy", "referrerPolicy")
                  .replace("allowfullscreen", "allowFullScreen")
              );

              setAddress(
                `${hood} ${street} ${no} ${apartament} ${district}${city}`
              );

              setTelNoText(
                `+90 ${data.telNo.slice(0, 3)} ${data.telNo.slice(
                  3,
                  6
                )} ${data.telNo.slice(6, 8)} ${data.telNo.slice(8, 10)}`
              );
            }
          });
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const newAddress =
      i18n.language === "tr"
        ? address?.replace("Hood", "Mah.").replace("St.", "Sk./Cd.")
        : address?.replace("Mah.", "Hood").replace("Sk./Cd.", "St.");

    setAddress(newAddress);
  }, [i18n.language]);

  useEffect(() => {
    getContactInfos();
  }, []);

  return (
    <div
      className={classNames(
        "flex flex-col gap-5 bg-contactBoxBack p-5 opacity-100 hover:opacity-100 duration-300",
        {
          "!gap-4": isLaptop,
        },
        {
          "!rounded-lg ": isTablet,
        }
      )}
    >
      <header
        className={classNames(
          "text-2xl font-medium flex items-center justify-center rounded-sm h-12 bg-contactBoxTitleBack text-ksGreen",
          {
            "!text-xl !h-10": isLaptop,
          }
        )}
      >
        {t("addressAndContactDetails")}
      </header>
      <div
        className={classNames("grid grid-cols-2 gap-2.5", {
          "!grid-cols-1": isMobile,
        })}
      >
        <a
          href={`tel:+90${contactInfos.telNo}`}
          className={classNames(
            "p-3.5 py-5 min-h-[122px] w-full flex flex-col gap-2.5 justify-center items-center rounded-lg bg-contactBoxTitleBack text-ksGreen relative overflow-hidden contactBoxButton duration-300"
          )}
        >
          <i
            className={classNames("fa-solid fa-phone text-3xl h-8", {
              "!text-2xl": isLaptop,
            })}
          ></i>
          <header
            className={classNames("text-myText font-medium text-center", {
              "!text-sm": isLaptop,
            })}
          >
            {telNoText}
          </header>
          <span
            className={classNames(
              "bg-gradient-to-tr to-black from-ksGreen bg-opacity-90 text-xl font-medium w-full h-full absolute left-0 top-0 flex items-center justify-center pointer-events-none opacity-0 invisible duration-300 contactBoxInfo",
              {
                "!text-lg": isLaptop,
              }
            )}
          >
            {t("callUs")}
          </span>
        </a>
        <a
          href={contactInfos.email}
          className={classNames(
            "p-3.5 py-5 min-h-[122px] w-full flex flex-col gap-2.5 justify-center items-center rounded-lg bg-contactBoxTitleBack text-ksGreen relative overflow-hidden contactBoxButton duration-300"
          )}
        >
          <i
            className={classNames("fa-solid fa-envelope text-3xl h-8", {
              "!text-2xl": isLaptop,
            })}
          ></i>
          <header
            className={classNames("text-myText font-medium text-center", {
              "!text-sm": isLaptop,
            })}
          >
            {contactInfos.email}
          </header>
          <span
            className={classNames(
              "bg-gradient-to-tr to-black from-ksGreen bg-opacity-90 text-xl font-medium w-full h-full absolute left-0 top-0 flex items-center justify-center pointer-events-none opacity-0 invisible duration-300 contactBoxInfo",
              {
                "!text-lg": isLaptop,
              }
            )}
          >
            Mail Gönder
          </span>
        </a>
      </div>
      <a
        href={contactInfos.googleMapsLink}
        target="_blank"
        className={classNames(
          "p-3.5 py-5 min-h-[122px] w-full flex flex-col gap-2.5 items-center rounded-lg bg-contactBoxTitleBack text-ksGreen relative overflow-hidden contactBoxButton duration-300 -mt-1.5"
        )}
      >
        <i
          className={classNames("fa-solid fa-location-dot text-3xl h-8", {
            "!text-2xl": isLaptop,
          })}
        ></i>
        <header
          className={classNames("text-myText font-medium text-center", {
            "!text-sm": isLaptop,
          })}
        >
          {address}
        </header>
        <span
          className={classNames(
            "bg-gradient-to-tl to-black from-ksGreen bg-opacity-90 text-xl font-medium w-full h-full absolute left-0 top-0 flex items-center justify-center pointer-events-none opacity-0 invisible duration-300 contactBoxInfo",
            {
              "!text-lg": isLaptop,
            }
          )}
        >
          {t("ourAddress")}
        </span>
      </a>
      <div
        className={classNames(
          "bg-white rounded-lg overflow-hidden h-48",
          {
            "!h-36": isLaptop,
          },
          {
            "!h-40": isTablet,
          }
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: iframeLink }} />
      </div>
    </div>
  );
}

export default ContactBox;
