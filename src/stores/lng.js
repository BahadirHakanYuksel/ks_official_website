import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLng: undefined,
};

const lng = createSlice({
  name: "lng",
  initialState,
  reducers: {
    updateLng: (state, action) => {
      state.activeLng = action.payload;
    },
  },
});

export default lng.reducer;
export const { updateLng } = lng.actions;
