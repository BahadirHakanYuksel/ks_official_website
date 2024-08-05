import classNames from "classnames";
import { useResponsiveData } from "../../Context";

function HomeTitle({ children }) {
  const { isTablet, isMobile } = useResponsiveData();

  return (
    <header
      className={classNames(
        "text-4xl font-normal text-center",
        {
          "!text-3xl": isTablet,
        },
        {
          "!text-xl": isMobile,
        }
      )}
    >
      {children}
    </header>
  );
}

export default HomeTitle;
