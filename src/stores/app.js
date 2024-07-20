import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSliderSectionId: 0,
  individual: [
    {
      id: 0,
      title: "DASK",
      iconUrl: "/Dask.png",
      url: "",
    },
    {
      id: 1,
      title: "NeoEnerjik Kasko",
      iconUrl: "/e_arac.png",
      url: "",
    },
    {
      id: 2,
      title: "Ferdi Kaza Sigortası",
      iconUrl: "/FerdiKaza.png",
      url: "",
    },
    {
      id: 3,
      title: "Kasko Bireysel",
      iconUrl: "/kasko.png",
      url: "",
    },
    {
      id: 4,
      title: "İhtiyari Mali Masuliyet (İMM) Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 5,
      title: "Zorunlu Trafik Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 6,
      title: "Tamamlayıcı Sağlık Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 7,
      title: "Seyehat Sağlık Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
  ],
  corporate: [
    {
      id: 0,
      title: "DASK",
      iconUrl: "/Dask.png",
      url: "",
    },
    {
      id: 1,
      title: "Zorunlu Trafik Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 2,
      title: "Ferdi Kaza Sigortası",
      iconUrl: "/FerdiKaza.png",
      url: "",
    },
    {
      id: 3,
      title: "Kasko Kurumsal",
      iconUrl: "/kasko.png",
      url: "",
    },
    {
      id: 4,
      title: "Limitsiz (İMM) Sigortası",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 5,
      title: "TARSİM",
      iconUrl: "/e_arac.png",
      url: "",
    },
    {
      id: 6,
      title: "İşyeri Sigortaları",
      iconUrl: "/konutt.png",
      url: "",
    },
    {
      id: 7,
      title: "Nakliyat Sigortaları",
      iconUrl: "/konutt.png",
      url: "",
    },
  ],
  mainIndividualContents: [
    {
      text: "DASK",
      id: 0,
    },
    {
      text: "Neoenerejik",
      id: 1,
    },
    {
      text: "Ferdi Kaza",
      id: 2,
    },
    {
      text: "Kasko Bireysel",
      id: 3,
    },
    {
      text: "IMM",
      id: 4,
    },
    {
      text: "Zorunlu Trafik",
      id: 5,
    },
    {
      text: "Tamamlayıcı Sağlık",
      id: 6,
    },
    {
      text: "Seyehat sağlık",
      id: 7,
    },
  ],
  activeService: false,
  activeMainContent: false,
  activeSubContent: false,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    rigtSlider: (state) => {
      state.activeSliderSectionId < 2
        ? state.activeSliderSectionId++
        : (state.activeSliderSectionId = 0);
    },
    leftSlider: (state) => {
      state.activeSliderSectionId > 0
        ? state.activeSliderSectionId--
        : (state.activeSliderSectionId = 2);
    },
    updateService: (state, action) => {
      state.activeService = action.payload;
    },
    updateMainContent: (state, action) => {
      state.activeMainContent = action.payload;
    },
  },
});

export default app.reducer;
export const { rigtSlider, leftSlider, updateService, updateMainContent } =
  app.actions;
