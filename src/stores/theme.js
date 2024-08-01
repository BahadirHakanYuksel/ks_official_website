import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  act_theme: localStorage.getItem("ks_theme")
    ? localStorage.getItem("ks_theme")
    : "light",
};

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, actions) => {
      state.act_theme = actions.payload;
      localStorage.setItem("ks_theme", state.act_theme);
    },
  },
});

export default theme.reducer;
export const { updateTheme } = theme.actions;
