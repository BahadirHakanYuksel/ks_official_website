import { useTranslation } from "react-i18next";
import ContactBox from "../../../components/ContactBox";
import HomeTitle from "../../../components/HomeTitle";
import MessageBox from "../../../components/MessageBox";
import classNames from "classnames";
import { useResponsiveData } from "../../../Context";

function ContactHome() {
  const { t } = useTranslation();
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  return (
    <div className="flex flex-col gap-5">
      <HomeTitle>{t("contactAndAdress")}</HomeTitle>
      <div
        className={classNames(
          "w-full h-[562px] grid grid-cols-2 overflow-hidden rounded-lg shadow-lg",
          {
            "!h-[500px]": isLaptop,
          },
          {
            "!grid-cols-1 !h-auto ": isTablet,
          }
        )}
      >
        <MessageBox />
        <ContactBox />
      </div>
    </div>
  );
}

export default ContactHome;
