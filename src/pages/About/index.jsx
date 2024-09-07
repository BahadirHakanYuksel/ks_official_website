import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { aboutUsTextEN, aboutUsTextTR } from "../../consts";
function About() {
  const { t, i18n } = useTranslation();

  const parseContent = (content) => {
    const parts = content.split(
      /(\*\*.*?\*\*|###.*?###|##.*?##|#.*?#|--.*?--|\[.*?\]\(.*?\)|\* .+?(?:\n|$))/
    );

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong className="text-ksGreen text-lg" key={index}>
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("###") && part.endsWith("###")) {
        return (
          <header className="text-4xl font-medium text-titleColor" key={index}>
            {part.slice(3, -3)}
          </header>
        );
      } else if (part.startsWith("##") && part.endsWith("##")) {
        return (
          <header className="text-3xl font-medium text-titleColor" key={index}>
            {part.slice(2, -2)}
          </header>
        );
      } else if (part.startsWith("# ") && part.endsWith(" #")) {
        return (
          <header className="text-2xl font-medium text-titleColor" key={index}>
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
      } else if (part.startsWith("-- ") && part.endsWith(" --")) {
        return (
          <span
            key={index}
            className="text-ksGreen flex items-center justify-start font-medium text-lg p-2.5 rounded-md bg-preKsBoxBack"
          >
            "{part.slice(2, -2)}"
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
  const [parag, setParag] = useState([]);
  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    i18n.language === "tr"
      ? setParag(aboutUsTextTR.split("\n"))
      : setParag(aboutUsTextEN.split("\n"));
  }, [i18n.language]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5"
    >
      <Helmet>
        <title>{t("about-us")}</title>
      </Helmet>
      <PageTitle>{t("about-us")}</PageTitle>
      <div className="page flex flex-col gap-5">
        {parag.map((row, i) => (
          <p key={i}>{parseContent(row)}</p>
        ))}
      </div>
    </motion.div>
  );
}

export default About;
