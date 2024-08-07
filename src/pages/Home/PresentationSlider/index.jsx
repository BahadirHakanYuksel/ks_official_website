// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
// import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full text-white bg-ksGreen text-base hover:bg-green-600 opacity-0 pointer-events-none sliderBtn duration-300"
      onClick={onClick}
    >
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute z-10 left-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full text-white bg-ksGreen text-base hover:bg-green-600 duration-300 opacity-0 sliderBtn"
      onClick={onClick}
    >
      <i class="fa-solid fa-arrow-left"></i>
    </button>
  );
}

function PresentationSlider() {
  const { i18n } = useTranslation();
  const [sliderSettings, setSliderSettings] = useState({});
  const [activeSliderPageId, setactiveSliderPageId] = useState(0);
  let sliderInterval;

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

  const sliderData = [
    {
      id: 0,
      url: i18n.language === "en" ? "ks_1.png" : "sh_1.png",
      link: "page 1",
    },
    {
      id: 1,
      url: i18n.language === "en" ? "ks_2.png" : "ks_2tr.png",
      link: "page 2",
    },
    {
      id: 2,
      url: i18n.language === "en" ? "ks_3.png" : "ks_3tr.png",
      link: "page 3",
    },
  ];

  return (
    <div
      className={classNames("rounded-md overflow-hidden h-auto presenteSlider")}
    >
      <div className="flex gap-2.5 relative sliderBox w-full aspect-video">
        {sliderData.map((sliderSection) => (
          <motion.div
            key={sliderSection.id}
            className={classNames(
              "aspect-video absolute w-full left-0 top-0 opacity-0 invisible text-white bg-gray-700 transition-all rounded-lg",
              {
                "!opacity-100 !visible":
                  sliderSection.id === activeSliderPageId,
              }
            )}
          >
            {/* <img src="" className="aspect-video" alt="" /> */}
            <AnimatePresence>
              {activeSliderPageId === sliderSection.id && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                  src={`images/${sliderSection.url}`}
                  alt=""
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        <button
          onClick={rightClick}
          className="absolute right-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full text-white bg-ksGreen text-base hover:bg-green-600 opacity-0 pointer-events-none sliderBtn duration-300"
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button
          onClick={leftClick}
          className="absolute left-2 top-1/2 -translate-y-1/2  w-10 h-10 rounded-full text-white bg-ksGreen text-base hover:bg-green-600 opacity-0 pointer-events-none sliderBtn duration-300"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
}

export default PresentationSlider;
