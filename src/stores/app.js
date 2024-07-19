import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSliderSectionId: 0,
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
  },
});

export default app.reducer;
export const { rigtSlider, leftSlider } = app.actions;
