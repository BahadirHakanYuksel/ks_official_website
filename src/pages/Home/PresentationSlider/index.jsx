// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
// import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useResponsiveData } from "../../../Context";

function PresentationSlider() {
  const { i18n } = useTranslation();
  const [activeSliderPageId, setactiveSliderPageId] = useState(0);
  const { isMobile, isSmallMobile } = useResponsiveData();
  let sliderInterval;

  const [sliderData, setSliderData] = useState([
    {
      id: 0,
      url: i18n.language === "en" ? "ks_1.png" : "sh_1.png",
      link: "page 1",
      queue: 0,
    },
    {
      id: 1,
      url: i18n.language === "en" ? "ks_2.png" : "ks_2tr.png",
      link: "page 2",
      queue: 1,
    },
    {
      id: 2,
      url: i18n.language === "en" ? "ks_3.png" : "ks_3tr.png",
      link: "page 3",
      queue: 2,
    },
  ]);

  const [TRData, setTRData] = useState([]);
  const [ENData, setENData] = useState([]);

  const rightClick = () => {
    clearInterval(sliderInterval);
    activeSliderPageId < 2
      ? setactiveSliderPageId(activeSliderPageId + 1)
      : setactiveSliderPageId(0);
  };

  const leftClick = () => {
    clearInterval(sliderInterval);
    activeSliderPageId > 0
      ? setactiveSliderPageId(activeSliderPageId - 1)
      : setactiveSliderPageId(2);
  };

  useEffect(() => {
    sliderInterval = setInterval(rightClick, 8000);

    return () => {
      clearInterval(sliderInterval);
    };
  }, [activeSliderPageId]);

  const getPresentationImages = async () => {
    const request_url = import.meta.env.VITE_REQUEST_URL;
    const getPreImg = import.meta.env.VITE_REQUEST_PRESENTATION_IMAGES;
    const formData = new FormData();
    formData.append("action", getPreImg);

    try {
      const res = await fetch(request_url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Ağ hatası: " + res.status);
      }

      const db = await res.json();

      const sortedTRData = await db
        .filter((data) => data.lng === "tr")
        .sort((a, b) => a.queue - b.queue);
      const sortedENData = await db
        .filter((data) => data.lng === "en")
        .sort((a, b) => a.queue - b.queue);

      setTRData(sortedTRData);
      setENData(sortedENData);

      i18n.language === "en" && setSliderData(sortedENData);
      i18n.language === "tr" && setSliderData(sortedTRData);
    } catch (error) {
      console.error("Error:", error);
      alert("Bir hata oluştu !");
    }
  };

  useEffect(() => {
    getPresentationImages();
  }, []);

  useEffect(() => {
    i18n.language === "en" && setSliderData(ENData);
    i18n.language === "tr" && setSliderData(TRData);
  }, [i18n.language]);

  return (
    <div className={classNames("rounded-md h-auto presenteSlider relative")}>
      <div className="flex gap-2.5 relative sliderBox overflow-hidden rounded-lg w-full aspect-video">
        {sliderData.map((sliderSection) => (
          <motion.a
            href={sliderSection.link === "" ? undefined : sliderSection.link}
            key={sliderSection.queue}
            className={classNames(
              "aspect-video absolute w-full left-0 top-0 opacity-0 invisible text-white bg-gray-700 transition-all",
              {
                "!opacity-100 !visible":
                  sliderSection.queue === activeSliderPageId,
              }
            )}
          >
            {/* <img src="" className="aspect-video" alt="" /> */}
            <AnimatePresence>
              {activeSliderPageId === sliderSection.queue && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                  src={
                    sliderSection.url === ""
                      ? `images/${sliderSection.url}`
                      : `https://katilimsigortacisi.com/images/${sliderSection.url}`
                  }
                  alt=""
                />
              )}
            </AnimatePresence>
          </motion.a>
        ))}
      </div>
      <button
        onClick={rightClick}
        className={classNames(
          "absolute right-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full text-white bg-ksGreen text-base hover:bg-green-600 opacity-0 pointer-events-none sliderBtn sliderRightBtn duration-300"
        )}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <button
        onClick={leftClick}
        className={classNames(
          "absolute left-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full text-white bg-ksGreen text-base hover:bg-green-600 opacity-0 pointer-events-none sliderBtn sliderLeftBtn duration-300"
        )}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div
        className={classNames(
          "absolute left-1/2 -translate-x-1/2 bottom-2 flex items-center justify-center gap-2.5"
        )}
      >
        {sliderData.map((btn) => (
          <button
            onClick={() => {
              clearInterval(sliderInterval);
              setactiveSliderPageId(btn.queue);
            }}
            key={btn.queue}
            className={classNames(
              "w-20 h-1.5 rounded-full bg-white duration-200 hover:bg-opacity-70 sliderControlBtn",
              {
                "!bg-ksGreen": btn.queue === activeSliderPageId,
              },
              {
                "!w-12 !h-1": isMobile,
              },
              {
                "!w-[38px]": isSmallMobile,
              }
            )}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default PresentationSlider;
