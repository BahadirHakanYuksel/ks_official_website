import classNames from "classnames";
import { useResponsiveData } from "../../../../Context";

export default function TeamHeader({ children }) {
  const { isTablet, isMobile } = useResponsiveData();
  return (
    <header
      className={classNames("text-base font-medium text-gray-400 flex gap-1", {
        "!text-sm": isTablet,
      })}
    >
      {children}
    </header>
  );
}
