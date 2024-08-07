import classNames from "classnames";
import { useResponsiveData } from "../../../Context";

function ModalBoxHeader({ children }) {
  const { isMobile } = useResponsiveData();
  return (
    <header
      className={classNames("text-2xl font-medium text-titleColor", {
        "!lg": isMobile,
      })}
    >
      {children}
    </header>
  );
}

export default ModalBoxHeader;
