import { useEffect, useState } from "react";

function MessageBox() {
  const [formKs, setFormKs] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [sendButtonIsActive, setSendButtonIsActive] = useState(false);

  const formUpdate = (e) => {
    const { value, name } = e.target;
    setFormKs({
      ...formKs,
      [name]: value,
    });
  };

  const sendForm = (e) => {
    e.preventDefault();
    setFormKs({
      name: "",
      surname: "",
      email: "",
      message: "",
    });
    console.log(formKs);
  };

  useEffect(() => {
    formKs.name.trim().length > 2 &&
    formKs.surname.trim().length > 1 &&
    formKs.message.trim().length >= 10
      ? setSendButtonIsActive(true)
      : setSendButtonIsActive(false);
  }, [formKs]);

  return (
    <form
      onSubmit={sendForm}
      className="flex flex-col gap-5 bg-messageBoxBack p-5"
    >
      <header className="text-2xl font-medium flex items-center justify-center rounded-sm h-12 bg-ksGreen text-white">
        Bizimle iletişime geçin
      </header>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col gap-0.5">
          <header className="text-lg font-medium">Adınız</header>
          <input
            maxLength={100}
            name="name"
            onChange={(e) => formUpdate(e)}
            value={formKs.name}
            type="text"
            placeholder="Adınızı Giriniz"
            className="h-12 rounded-md px-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <header className="text-lg font-medium">Soyadınız</header>
          <input
            maxLength={100}
            name="surname"
            onChange={(e) => formUpdate(e)}
            value={formKs.surname}
            type="text"
            placeholder="Soyadınızı Giriniz"
            className="h-12 rounded-md px-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200"
          />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <header className="text-lg font-medium">E-Posta Adresiniz</header>
        <input
          maxLength={60}
          name="email"
          onChange={(e) => formUpdate(e)}
          value={formKs.email}
          type="email"
          placeholder="E-Posta Adresinizi Giriniz"
          className="h-12 rounded-md px-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <header className="text-lg font-medium">Mesajınız</header>
          <span className="text-gray-300 font-medium text-sm">
            {formKs.message.length}/2000
          </span>
        </div>
        <textarea
          maxLength={2000}
          name="message"
          onChange={(e) => formUpdate(e)}
          value={formKs.message}
          type="text"
          placeholder="Mesajınızı Giriniz"
          className="h-40 rounded-md p-3 text-base font-medium text-messageBoxInputBack bg-backColor border-2 border-solid border-gray-400 focus:border-ksGreen duration-200 resize-none"
        />
      </div>
      <button
        disabled={!sendButtonIsActive}
        type="submit"
        className="bg-messageBoxBack border-2 border-solid border-ksGreen text-ksGreen hover:bg-ksGreen hover:text-white h-12 rounded-full text-lg font-medium duration-200 disabled:pointer-events-none disabled:opacity-50"
      >
        Gönder
      </button>
    </form>
  );
}

export default MessageBox;
