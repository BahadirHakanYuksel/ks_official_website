export const turkishToEnglish = (text) => {
  const charMap = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    I: "I",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return text
    .split("")
    .map((char) => charMap[char] || char)
    .join("");
};

export const url_tr_data = [
  {
    first: "/about",
    second: "/hakkimizda",
  },
  {
    first: "/contact",
    second: "/iletisim",
  },

  {
    first: "/what-is-the-ks",
    second: "/katilim-sigortasi-nedir",
  },
];

export const url_en_data = [
  {
    first: "/hakkimizda",
    second: "/about",
  },
  {
    first: "/iletisim",
    second: "/contact",
  },
  {
    first: "/katilim-sigortasi-nedir",
    second: "/what-is-the-ks",
  },
];

export const convertFromTextToUrl = (text) => {
  const myUrl = encodeURIComponent(
    turkishToEnglish(text).replace(/ /g, "-")
  ).toLowerCase();

  return myUrl;
};
