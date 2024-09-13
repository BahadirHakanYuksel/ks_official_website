import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function InsuranceServiceContent({ mainContent, subContent }) {
  const parseContent = (content) => {
    const parts = content.split(
      /(\*\*.*?\*\*|###.*?###|##.*?##|#.*?#|--.*?--|\[.*?\]\(.*?\)|\* .+?(?:\n|$))/
    );

    return parts.map((part, index) => {
      if (part.startsWith("** ") && part.endsWith(" **")) {
        return (
          <strong className="text-titleColor" key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("###") && part.endsWith("###")) {
        return (
          <header className="text-3xl font-medium text-titleColor" key={index}>
            {part.slice(3, -3)}
          </header>
        );
      } else if (part.startsWith("##") && part.endsWith("##")) {
        return (
          <header className="text-2xl font-medium text-titleColor" key={index}>
            {part.slice(2, -2)}
          </header>
        );
      } else if (part.startsWith("#") && part.endsWith("#")) {
        return (
          <header className="text-2xl font-medium text-myText" key={index}>
            {part.slice(1, -1)}
          </header>
        );
      } else if (
        part.startsWith("[") &&
        part.includes("](") &&
        part.endsWith(")")
      ) {
        const text = part.slice(1, part.indexOf("]"));
        const url = part.slice(part.indexOf("(") + 1, -1);
        return (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
      } else if (part.startsWith("--") && part.endsWith("--")) {
        return (
          <span key={index} className="text-ksGreen">
            {part.slice(2, -2)}
          </span>
        );
      } else if (part.startsWith("* ")) {
        return (
          <div key={index} className="flex items-center justify-start gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-ksGray"></div>
            <span>{part.slice(2).trim()}</span>
          </div>
        );
      }
      return part;
    });
  };
  const [activeContent, setActiveContent] = useState("");
  const { activeMainContent } = useSelector((state) => state.app);
  const tarsimUrls = [
    {
      service_name: "Bitkisel Ürün Sigortası",
      url_name: "bus",
    },
    {
      service_name: "Sera Sigortası",
      url_name: "sera",
    },
    {
      service_name: "Büyükbaş Hayvan Hayat Sigortası",
      url_name: "buyukbas",
    },
    {
      service_name: "Büyükbaş Hayvan Hayat Sigortası",
      url_name: "kucukbas",
    },
    {
      service_name: "Kümes Hayvanları Hayat Sigortası",
      url_name: "kumes",
    },
    {
      service_name: "Su Ürünleri Hayat Sigortası",
      url_name: "su-urunleri",
    },
    {
      service_name: "Arıcılık Sigortası",
      url_name: "aricilik",
    },
    {
      service_name: "Köy Bazlı Kuraklık Verim Sigortası",
      url_name: "kbkvs",
    },
    {
      service_name: "Gelir Koruma Sigortası",
      url_name: "gks",
    },
  ];
  const WhenPageLoading = async () => {
    if (activeMainContent !== "alotsof") {
      const response = await fetch(activeMainContent);
      const description = await response.text();
      // console.log("Burdayım : ", description);
      setActiveContent(description);
    }
  };
  useEffect(() => {
    WhenPageLoading();
  }, [activeMainContent]);

  return (
    <div className="flex flex-col gap-1.5">
      {activeMainContent !== "alotsof" &&
        activeContent
          .split("\n")
          .map((row, i) => <p key={i}>{parseContent(row)}</p>)}

      {activeMainContent === "alotsof" &&
        tarsimUrls.map((t, i) => (
          <a
            className="h-12 bg-preKsBoxBack border-2 border-solid border-ksGrayTp rounded-md hover:bg-ksGreen text-titleColor hover:text-white duration-200 flex items-center serviceContentButton px-2.5 font-medium shadow-lg gap-1.5"
            href={`/services_data/tr/${t.url_name}-genel-sartlar.pdf`}
            key={i}
          >
            <i className="fa-solid fa-file-pdf text-xl text-ksGreen duration-200"></i>
            {t.service_name}
          </a>
        ))}
    </div>
  );
}

export default InsuranceServiceContent;
