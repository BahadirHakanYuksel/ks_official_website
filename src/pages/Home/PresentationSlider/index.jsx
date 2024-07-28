import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
import Slider from "react-slick";

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
  const sliderData = [
    {
      id: 0,
      url: "slider1.png",
      link: "page 1",
    },
    {
      id: 1,
      url: "slider2.png",
      link: "page 2",
    },
    {
      id: 2,
      url: "slider3.png",
      link: "page 3",
    },
  ];

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="rounded-md overflow-hidden h-[700px]">
      <Slider {...settings} className="flex gap-2.5 relative sliderBox">
        {sliderData.map((sliderSection) => (
          <div
            key={sliderSection.id}
            className={classNames(
              " aspect-video text-white bg-gray-700 duration-300 rounded-lg min-h-[600px]"
            )}
          >
            {/* <img src="" className="aspect-video" alt="" /> */}
            <img src={`images/${sliderSection.url}`} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PresentationSlider;
