import ContactBox from "../../../components/ContactBox";
import HomeTitle from "../../../components/HomeTitle";
import MessageBox from "../../../components/MessageBox";

function ContactHome() {
  return (
    <div className="flex flex-col gap-5">
      <HomeTitle>İletişim ve Adres</HomeTitle>
      <div className="w-full h-[562px] grid grid-cols-2 overflow-hidden rounded-lg shadow-lg">
        <MessageBox />
        <ContactBox />
      </div>
    </div>
  );
}

export default ContactHome;
