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
    second: "/kurumsal",
  },

  {
    first: "/contact",
    second: "/iletisim",
  },
];

export const url_en_data = [
  {
    first: "/kurumsal",
    second: "/about",
  },
  {
    first: "/iletisim",
    second: "/contact",
  },
];

export const convertFromTextToUrl = (text) => {
  const myUrl = encodeURIComponent(
    turkishToEnglish(text).replace(/ /g, "-")
  ).toLowerCase();

  return myUrl;
};
