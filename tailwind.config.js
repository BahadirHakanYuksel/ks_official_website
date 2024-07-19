/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ksGray: "var(--ksGray)",
        ksGrayTp: "var(--ksGrayTp)",
        ksGreen: "var(--ksGreen)",
        backColor: "var(--back_color)",
        myText: "var(--myText)",
        activeTitleColor: "var(--activeTitleColor)",
        titleColor: "var(--titleColor)",
        titleColorHover: "var(--titleColorHover)",
        lngBtnBack: "var(--lng_btn_back)",
        preKsBoxBack: "var(--preKsBoxBack)",
        preKsBoxIcon: "var(--preKsBoxIcon)",
      },
    },
  },
  plugins: [],
};
