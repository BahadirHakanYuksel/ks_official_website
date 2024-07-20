import { useState } from "react";
import { useSelector } from "react-redux";

function InsuranceServiceContent({ mainContent, subContent }) {
  const parseContent = (content) => {
    const parts = content.split(
      /(\*\*.*?\*\*|###.*?###|##.*?##|#.*?#|--.*?--|\[.*?\]\(.*?\)|\* .+?(?:\n|$))/
    );

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith("###") && part.endsWith("###")) {
        return <h3 key={index}>{part.slice(3, -3)}</h3>;
      } else if (part.startsWith("##") && part.endsWith("##")) {
        return <h2 key={index}>{part.slice(2, -2)}</h2>;
      } else if (part.startsWith("#") && part.endsWith("#")) {
        return <h1 key={index}>{part.slice(1, -1)}</h1>;
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
            <div className="w-2.5 h-2.5 rounded-full text-ksGray"></div>
            <span>{part.slice(2).trim()}</span>
          </div>
        );
      }
      return part;
    });
  };

  const { activeMainContent } = useSelector((state) => state.app);

  const [paragraph, setParagraph] = useState();

  return <div>{activeMainContent}</div>;
}

export default InsuranceServiceContent;
