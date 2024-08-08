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
      iconUrl: "/limm_2.png",
      url: "",
    },
    {
      id: 5,
      title: "Zorunlu Trafik Sigortası",
      iconUrl: "/ztf.png",
      url: "",
    },
    {
      id: 6,
      title: "Tamamlayıcı Sağlık Sigortası",
      iconUrl: "/tsg.png",
      url: "",
    },
    {
      id: 7,
      title: "Seyehat Sağlık Sigortası",
      iconUrl: "/seyehatsaglik.png",
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
      iconUrl: "/ztf.png",
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
      iconUrl: "/limm_2.png",
      url: "",
    },
    {
      id: 5,
      title: "TARSİM",
      iconUrl: "/tarsim.png",
      url: "",
    },
    {
      id: 6,
      title: "İşyeri Sigortaları",
      iconUrl: "/isyeri_sigortasi.png",
      url: "",
    },
    {
      id: 7,
      title: "Nakliyat Sigortaları",
      iconUrl: "/nakliyat_sigortasi.png",
      url: "",
    },
  ],
  activeService: false,
  activeMainContent: false,
  activeSubContent: false,
  responsiveNavMenuIsActive: false,
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
    updateResNavMenu: (state) => {
      state.responsiveNavMenuIsActive = !state.responsiveNavMenuIsActive;
    },
    closeResNavMenu: (state) => {
      state.responsiveNavMenuIsActive = false;
    },
  },
});

export default app.reducer;
export const {
  rigtSlider,
  leftSlider,
  updateService,
  updateMainContent,
  updateResNavMenu,
  closeResNavMenu,
} = app.actions;
