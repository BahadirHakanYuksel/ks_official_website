import classNames from "classnames";
import { useResponsiveData } from "../../../Context";

function FooterHeader({ children }) {
  const { isLaptop, isTablet, isMobile } = useResponsiveData();
  return (
    <header
      className={classNames("text-[22px] font-medium text-ksGreen", {
        "!text-[18px]": isLaptop,
      })}
    >
      {children}
    </header>
  );
}

export default FooterHeader;
