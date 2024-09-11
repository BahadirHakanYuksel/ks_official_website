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

  const WhenPageLoading = async () => {
    console.log(activeMainContent);

    const response = await fetch(activeMainContent);
    const description = await response.text();
    // console.log("Burdayım : ", description);
    setActiveContent(description);
  };
  useEffect(() => {
    WhenPageLoading();
  }, [activeMainContent]);

  return (
    <div className="flex flex-col gap-1.5">
      {activeContent.split("\n").map((row, i) => (
        <p key={i}>{parseContent(row)}</p>
      ))}
    </div>
  );
}

export default InsuranceServiceContent;
