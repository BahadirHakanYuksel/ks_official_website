import { useTranslation } from "react-i18next";
import LanguageButtons from "../LanguageButtons";
import ThemeButton from "../ThemeButton";
import FooterHeader from "./FooterHeader";
import FooterBox from "./FooterBox";
import {
  aboutUsTextEN,
  aboutUsTextTR,
  convertFromTextToUrl,
  turkishToEnglish,
} from "../../consts";
import { useResponsiveData } from "../../Context";
import classNames from "classnames";

function Footer() {
  const { t, i18n } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  const footerTextData = {
    tr: {
      aboutUs:
        "Dünya ve Türkiye ekonomisi için oldukça yeni olan, tüm bu kavram ve kurumları tanımak, kavramak, tartışmak, taraflar arasındaki ilişkileri anlamak, anlamlandırmak için, Dünya ve Türkiye ekonomisi için oldukça yeni olan, tüm bu kavram ve kurumları tanımak, kavramak, tartışmak, taraflar arasındaki ilişkileri anlamak, anlamlandırmak için, Katılım Esaslı Finans alanında akademik çalışmalar içinde olan tüm akademisyenlerimize dijital bir mekân olabilmek için, HELAL VE İMKÂN DAİRESİNDE OLANI MÜMKÜN KILMAK İÇİN Katılım sigortası platformunu kurmuş bulunuyoruz. Dua ve destek ve katkılarınızı bekliyoruz.",
      whatIsTheKs:
        "Faizsiz Finans Kuruluşları Muhasebe ve Denetleme Kurumu (AAOİFİ) tarafından belirlenip, Türkiye Katılım Bankaları Birliği tarafından yayınlanan ‘‘FAİZSİZ FİNANS STANDARTLARI ’’ kitabının SUNUŞ yazısı şöyle başlıyor. ‘‘ Dünyadaki finans ekosisteminin temelini teşkil eden faizin, dinimizce haram kılınmış olması Müslüman toplumların ayrı bir ekosistemi oluşturmasına sebebiyet vermiştir. Dünyanın geri kalanında İslami Finans olarak anılan bu finans sistemi ülkemizde ’’ KATILIM BANKACILIĞI ‘‘ olarak telaffuz edilmektedir.",
    },
    en: {
      aboutUs:
        "In order to recognise, comprehend and discuss all these concepts and institutions, which are quite new for the world and Turkish economy, to understand and make sense of the relations between the parties, in order to recognise, comprehend and discuss all these concepts and institutions, which are quite new for the world and Turkish economy, in order to understand and make sense of the relations between the parties, in order to be a digital space for all our academicians who are in academic studies in the field of Participation Based Finance, we have established the Participation insurance platform TO MAKE POSSIBLE WHAT IS WITHIN HALAL AND POSSIBLE. We are waiting for your prayers and support and contributions.",
      whatIsTheKs:
        "The introduction of the book ‘’FAISIZIZ FINANCE STANDARDS‘’, which was determined by the Accounting and Supervision Institution for Interest-Free Financial Institutions (AAOIFI) and published by the Participation Banks Association of Turkey, begins as follows. ‘’ The fact that interest, which forms the basis of the financial ecosystem in the world, is forbidden by our religion has caused Muslim societies to create a separate ecosystem. This financial system, which is referred to as Islamic Finance in the rest of the world, is known as ‘’ It is pronounced as ‘PARTICIPATION BANKING’",
    },
  };

  const footerBoxesData = [
    {
      title: t("about-us"),
      description:
        i18n.language === "tr"
          ? footerTextData.tr.aboutUs
          : footerTextData.en.aboutUs,
      buttonUrl: "/about-us",
    },
    {
      title: t("agenda"),
      description: t("footerBox2Desc"),
      buttonUrl: "/",
    },
    {
      title: `${t("what-is-the-ks")} ?`,
      description:
        i18n.language === "tr"
          ? footerTextData.tr.whatIsTheKs
          : footerTextData.en.whatIsTheKs,
      buttonUrl: "/what-is-participation-insurance",
    },
  ];

  const socialMediaButtons = [
    {
      smName: "Instagram",
      link: "",
      iconClass: "fa-brands fa-instagram",
    },
    {
      smName: "YouTube",
      link: "",
      iconClass: "fa-brands fa-youtube",
    },
    {
      smName: "Facebook",
      link: "",
      iconClass: "fa-brands fa-facebook",
    },
  ];

  return (
    <footer className="page flex flex-col gap-2.5 mt-24 mb-5">
      <div
        className={classNames(
          "grid grid-cols-3 h-auto p-3 bg-preKsBoxBack rounded-lg gap-10 overflow-hidden shadow-lg",
          {
            "!grid-cols-1": isMobile,
          }
        )}
      >
        {footerBoxesData.map((box, i) => (
          <FooterBox
            title={box.title}
            description={box.description}
            type={i}
            key={i}
            url={box.buttonUrl}
          />
        ))}
      </div>
      <div
        className={classNames(
          "flex justify-between p-3 items-center bg-preKsBoxBack rounded-lg gap-10 overflow-hidden shadow-lg",
          {
            "!p-2": isLaptop,
          },
          {
            "!flex-col !justify-start !gap-5": isMobile,
          }
        )}
      >
        <div className="flex gap-2.5">
          <div
            className={classNames(
              "w-16 h-16 rounded-lg flex items-center justify-center bg-ksGray",
              {
                "!w-14 !h-14": isLaptop,
              }
            )}
          >
            <img src="images/logo.png" className="w-10 h-10" alt="" />
          </div>
          <div className="flex flex-col gap-0.5 items-center">
            <header
              className={classNames("text-3xl text-ksGreen font-medium", {
                "!text-xl": isLaptop,
              })}
            >
              Katılım Sigortası
            </header>
            <p>{t("halalInsurance")}</p>
          </div>
        </div>
        <div
          className={classNames("flex gap-2.5 items-center", {
            "!flex-col": isMobile,
          })}
        >
          <header
            className={classNames(
              "text-lg font-medium text-titleColor px-2.5 border-r-2 border-solid border-r-ksGrayTp",
              {
                "!text-base": isLaptop,
              },
              {
                "!text-base !border-0 !border-b !border-b-ksGrayTp": isMobile,
              }
            )}
          >
            {t("socialMediaAccouts")}
          </header>
          <div className="flex items-center gap-2.5">
            {socialMediaButtons.map((smButton, i) => (
              <button
                key={i}
                className={classNames(
                  "flex flex-col items-center justify-center rounded-md bg-footerAgendaButtonBack hover:bg-ksGray hover:text-white duration-200 h-16 w-16",
                  {
                    "!w-14 !h-14": isLaptop,
                  }
                )}
              >
                <i
                  className={classNames(`${smButton.iconClass} text-xl`, {
                    "!text-lg": isLaptop,
                  })}
                ></i>
                <span
                  className={classNames("text-xs font-medium", {
                    "!text-[10px]": isLaptop,
                  })}
                >
                  {smButton.smName}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={classNames("flex justify-between p-3", {
          "!flex-col gap-2.5 !justify-start items-center": isMobile,
        })}
      >
        <div className="flex items-center gap-4">
          <header
            className={classNames(
              "text-sm font-medium border-r-2 border-solid border-r-ksGrayTp pr-2.5",
              {
                "!text-xs": isLaptop,
              },
              {
                "!text-[10px]": isMobile,
              }
            )}
          >
            {t("changeLanguage")}
          </header>
          <LanguageButtons />
        </div>
        <p
          className={classNames("text-center font-medium", {
            "!text-sm": isLaptop,
          })}
        >
          © 2024 <span className="text-ksGreen">Katılım Sigortası </span>{" "}
          {t("officialWebsite")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
