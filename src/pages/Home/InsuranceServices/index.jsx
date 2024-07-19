import { useState } from "react";
import HomeTitle from "../../../components/HomeTitle";
import classNames from "classnames";
import ServiceBox from "./ServiceBox";

function InsuranceServices() {
  const [ActiveServiceId, setActiveServiceId] = useState(0);
  const controlButtons = [
    {
      text: "Bireysel",
      id: 0,
    },
    {
      text: "Kurumsal",
      id: 1,
    },
  ];

  const bireysel = [
    {
      id: 0,
      title: "DASK",
      iconUrl: "/Dask.png",
      url: "",
    },
    {
      id: 1,
      title: "NeoEnerjik Kask",
      iconUrl: "/e_arac.png",
      url: "",
    },
    {
      id: 2,
      title: "Ferdi Kaza Sigortası",
      iconUrl: "/FerdiKaza.png",
      url: "",
    },
    {
      id: 3,
      title: "Kasko Bireysel",
      iconUrl: "/kasko.png",
      url: "",
    },
    {
      id: 4,
      title: "İhtiyari Mali Masuliyet (İMM) Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 5,
      title: "Zorunlu Trafik Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 6,
      title: "Tamamlayıcı Sağlık Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 7,
      title: "Seyehat Sağlık Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
  ];
  const kurumsal = [
    {
      id: 0,
      title: "DASK",
      iconUrl: "/Dask.png",
      url: "",
    },
    {
      id: 1,
      title: "Zorunlu Trafik Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 2,
      title: "Ferdi Kaza Sigortası",
      iconUrl: "/FerdiKaza.png",
      url: "",
    },
    {
      id: 3,
      title: "Kasko Kurumsal",
      iconUrl: "/kasko.png",
      url: "",
    },
    {
      id: 4,
      title: "Limitsiz (İMM) Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 5,
      title: "TARSİM",
      iconUrl: "/e_arac.png",
      url: "",
    },
    {
      id: 6,
      title: "İşyeri Sigortaları",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 7,
      title: "Nakliyat Sigortaları",
      iconUrl: "/konutt.png",
      url: "",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <HomeTitle>Sigorta Hizmetleri</HomeTitle>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2.5">
          {controlButtons.map((btn) => (
            <button
              onClick={() => setActiveServiceId(btn.id)}
              key={btn.id}
              className={classNames(
                "bg-ksGray text-white w-32 h-10 rounded-full border-2 border-solid border-transparent hover:border-ksGreen duration-200 text-base shadow-md opacity-70 hover:opacity-100",
                {
                  "!bg-ksGreen !opacity-100": ActiveServiceId === btn.id,
                }
              )}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {ActiveServiceId === 0 &&
          bireysel.map((service, i) => (
            <ServiceBox
              title={service.title}
              iconUrl={service.iconUrl}
              key={service.id}
            />
          ))}
        {ActiveServiceId === 1 &&
          kurumsal.map((service, i) => (
            <ServiceBox
              title={service.title}
              iconUrl={service.iconUrl}
              key={service.id}
            />
          ))}
      </div>
    </div>
  );
}

export default InsuranceServices;
