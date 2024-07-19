import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSliderSectionId: 0,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    rigtSlider: (state) => {
      if (state.activeSliderSectionId < 2) {
        state.activeSliderSectionId++;
      } else {
        state.activeSliderSectionId = 0;
      }
    },
    leftSlider: (state) => {
      if (state.activeSliderSectionId > 0) {
        state.activeSliderSectionId--;
      } else {
        state.activeSliderSectionId = 2;
      }
    },
  },
});

export default app.reducer;
export const { rigtSlider, leftSlider } = app.actions;
