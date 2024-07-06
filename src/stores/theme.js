import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  act_theme: "light",
};

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, actions) => {
      state.act_theme = actions.payload;
    },
  },
});

export default theme.reducer;
export const { updateTheme } = theme.actions;
