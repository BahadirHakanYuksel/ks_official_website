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
    first: "/what-is-participation-insurance",
    second: "/katilim-sigortasi-nedir",
  },
  {
    first: "/corporate/dask",
    second: "/kurumsal/dask",
  },
  ,
  {
    first: "/individual/dask",
    second: "/bireysel/dask",
  },
  {
    first: "/agenda/news",
    second: "/gundem/haberler",
  },
  {
    first: "/agenda/articles",
    second: "/gundem/makaleler",
  },
  {
    first: "/agenda/announcements",
    second: "/gundem/duyurular",
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
    second: "/what-is-participation-insurance",
  },
  ,
  {
    first: "/kurumsal/dask",
    second: "/corporate/dask",
  },
  ,
  {
    first: "/bireysel/dask",
    second: "/individual/dask",
  },
  {
    first: "/gundem/haberler",
    second: "/agenda/news",
  },
  {
    first: "/gundem/makaleler",
    second: "/agenda/articles",
  },
  {
    first: "/gundem/duyurular",
    second: "/agenda/announcements",
  },
];

export const convertFromTextToUrl = (text) => {
  const myUrl = encodeURIComponent(
    turkishToEnglish(text).replace(/ /g, "-")
  ).toLowerCase();

  return myUrl;
};
