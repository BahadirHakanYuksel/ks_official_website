import { useTranslation } from "react-i18next";
import ContactBox from "../../../components/ContactBox";
import HomeTitle from "../../../components/HomeTitle";
import MessageBox from "../../../components/MessageBox";

function ContactHome() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <HomeTitle>{t("contactAndAdress")}</HomeTitle>
      <div className="w-full h-[562px] grid grid-cols-2 overflow-hidden rounded-lg shadow-lg">
        <MessageBox />
        <ContactBox />
      </div>
    </div>
  );
}

export default ContactHome;
