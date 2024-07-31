import { useTranslation } from "react-i18next";
import LanguageButtons from "../LanguageButtons";
import ThemeButton from "../ThemeButton";
import FooterHeader from "./FooterHeader";
import FooterBox from "./FooterBox";

function Footer() {
  const { t, i18n } = useTranslation();

  const footerBoxesData = [
    {
      title: t("about-us"),
      description:
        "Katılım-Tekafül Sigorta olarak, müşterilerimize İslami prensiplere uygun, adil ve şeffaf bir sigorta deneyimi sunmayı taahhüt ediyoruz. Amacımız, bireylerin ve işletmelerin risklerini paylaşarak vence altına almalarına yardımcı olmak ve bu süreçte toplumsal dayanışmayıajshdashdaksdh",
    },
    {
      title: t("agenda"),
      description: t("footerBox2Desc"),
    },
    {
      title: `${t("what-is-the-ks")} ?`,
      description:
        "Katılım sigortası, İslami finans prensiplerine uygun olarak faaliyet gösteren ve sigorta risklerinin paylaşımını esas alan bir sigorta modelidir. Bu model, geleneksel sigorta sistemlerinden farklı olarak,müşteri ve sigorta şirketi arasındaki ilişkiyi bir ortaklık şeklinde yapılandırır. Katılımasdasdasdasdasd",
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
      <div className="grid grid-cols-3 h-auto p-3 bg-preKsBoxBack rounded-lg gap-10 overflow-hidden shadow-lg">
        {footerBoxesData.map((box, i) => (
          <FooterBox
            title={box.title}
            description={box.description}
            type={i}
            key={i}
          />
        ))}
      </div>
      <div className="flex justify-between p-3 items-center bg-preKsBoxBack rounded-lg gap-10 overflow-hidden shadow-lg">
        <div className="flex gap-2.5">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-ksGray">
            <img src="images/logo.png" className="w-10 h-10" alt="" />
          </div>
          <div className="flex flex-col gap-0.5 items-center">
            <header className="text-3xl text-ksGreen font-medium">
              Katılım Sigortası
            </header>
            <p>{t("halalInsurance")}</p>
          </div>
        </div>
        <div className="flex gap-2.5 items-center">
          <header className="text-lg font-medium text-titleColor px-2.5 border-r-2 border-solid border-r-ksGrayTp">
            {t("socialMediaAccouts")}
          </header>
          <div className="flex items-center gap-2.5">
            {socialMediaButtons.map((smButton, i) => (
              <button
                key={i}
                className="flex flex-col items-center justify-center rounded-md bg-footerAgendaButtonBack hover:bg-ksGray hover:text-white duration-200 h-16 w-16"
              >
                <i className={`${smButton.iconClass} text-xl`}></i>
                <span className="text-xs font-medium">{smButton.smName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between p-3">
        <div className="flex items-center gap-4">
          <header className="text-sm font-medium border-r-2 border-solid border-r-ksGrayTp pr-2.5">
            {t("changeLanguage")}
          </header>
          <LanguageButtons />
        </div>
        <p className="text-center font-medium">
          © 2024 <span className="text-ksGreen">Katılım Sigortası </span>{" "}
          {t("officialWebsite")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
