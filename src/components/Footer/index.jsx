import { useTranslation } from "react-i18next";
import LanguageButtons from "../LanguageButtons";
import ThemeButton from "../ThemeButton";
import FooterHeader from "./FooterHeader";
import FooterBox from "./FooterBox";

function Footer() {
  const { t } = useTranslation();

  const footerBoxesData = [
    {
      title: t("about-us"),
      description:
        "Katılım-Tekafül Sigorta olarak, müşterilerimize İslami prensiplere uygun, adil ve şeffaf bir sigorta deneyimi sunmayı taahhüt ediyoruz. Amacımız, bireylerin ve işletmelerin risklerini paylaşarak vence altına almalarına yardımcı olmak ve bu süreçte toplumsal dayanışmayıajshdashdaksdh",
    },
    {
      title: t("agenda"),
      description: "Son paylaşılan haberler,duyurular ve makaleler.",
    },
    {
      title: t("what-is-the-ks"),
      description:
        "Katılım sigortası, İslami finans prensiplerine uygun olarak faaliyet gösteren ve sigorta risklerinin paylaşımını esas alan bir sigorta modelidir. Bu model, geleneksel sigorta sistemlerinden farklı olarak,müşteri ve sigorta şirketi arasındaki ilişkiyi bir ortaklık şeklinde yapılandırır. Katılımasdasdasdasdasd",
    },
  ];

  return (
    <footer className="page flex flex-col gap-2.5 mt-24 mb-5">
      {/* <LanguageButtons /> */}
      <div className="grid grid-cols-3 h-auto p-3 bg-preKsBoxBack rounded-lg gap-10 overflow-hidden">
        {footerBoxesData.map((box, i) => (
          <FooterBox
            title={box.title}
            description={box.description}
            type={i}
            key={i}
          />
        ))}
      </div>
      {/* <div className="grid grid-cols-2">
        <div className="flex gap-2.5">
          <div>icon</div>
          <div className="flex flex-col gap-1">
            <header>Katılım Sigorta</header>
            <p>Sigortanın Helali</p>
          </div>
        </div>
      </div> */}
    </footer>
  );
}

export default Footer;
