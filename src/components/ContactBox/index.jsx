import { useTranslation } from "react-i18next";

function ContactBox() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5 bg-contactBoxBack p-5 opacity-100 hover:opacity-100 duration-300">
      <header className="text-2xl font-medium flex items-center justify-center rounded-sm h-12 bg-contactBoxTitleBack text-ksGreen">
        {t("addressAndContactDetails")}
      </header>
      <div className="grid grid-cols-2 gap-5">
        <a
          href=""
          className="p-3 w-full h-36 flex flex-col gap-2.5 items-center rounded-lg bg-contactBoxTitleBack text-ksGreen relative overflow-hidden contactBoxButton duration-300"
        >
          <i className="fa-solid fa-location-dot text-3xl h-8"></i>
          <header className="text-myText font-medium text-center">
            {t("address")}
          </header>
          <span className="bg-black bg-opacity-90 text-2xl font-medium w-full h-full absolute left-0 top-0 flex items-center justify-center pointer-events-none opacity-0 invisible duration-300 contactBoxInfo">
            {t("ourAddress")}
          </span>
        </a>
        <a
          href="tel:05511234567"
          className="p-3 w-full h-36 flex flex-col gap-2.5 items-center rounded-lg bg-contactBoxTitleBack text-ksGreen relative overflow-hidden contactBoxButton duration-300"
        >
          <i className="fa-solid fa-phone text-3xl h-8"></i>
          <header className="text-myText font-medium text-center">
            0551 123 45 67
          </header>
          <span className="bg-black bg-opacity-90 font-medium text-2xl w-full h-full absolute left-0 top-0 flex items-center justify-center pointer-events-none opacity-0 invisible duration-300 contactBoxInfo">
            {t("callUs")}
          </span>
        </a>
      </div>
      <div className="bg-white rounded-lg overflow-hidden h-72">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.0411754855136!2d32.5364230757492!3d37.859326971964094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d085da2d1e08b7%3A0x5f87710882bc58b3!2sEmiray%20Sigorta%20Arac%C4%B1l%C4%B1k%20Hizmetleri!5e0!3m2!1str!2str!4v1722200196097!5m2!1str!2str"
          className="border-none w-full h-full hover:scale-105 duration-300"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactBox;
