import { useNavigate } from "react-router-dom";
import { turkishToEnglish } from "../../../../consts";
import { useResponsiveData } from "../../../../Context";
import classNames from "classnames";

function ServiceBox({ title, iconUrl, category }) {
  const navigate = useNavigate();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  const goServicePage = () => {
    document.scrollingElement.scrollTop = 0;
    navigate(
      `/${encodeURIComponent(
        turkishToEnglish(category.replace(/ /g, "-"))
      ).toLowerCase()}/${encodeURIComponent(
        turkishToEnglish(title.replace(/ /g, "-"))
      ).toLowerCase()}`
    );
  };

  return (
    <button
      onClick={goServicePage}
      className={classNames(
        "homeServiceBox w-60 h-60 bg-preKsBoxBack text-white rounded-md border-2 border-solid border-transparent hover:border-ksGreen duration-200 shadow-2xl flex justify-center items-center flex-col gap-1.5 scale-1 hover:scale-110"
      )}
    >
      <img className={classNames("w-32", {})} src={`images${iconUrl}`} alt="" />
      <header className={classNames("text-xl text-myText font-medium", {})}>
        {title}
      </header>
    </button>
  );
}

export default ServiceBox;
