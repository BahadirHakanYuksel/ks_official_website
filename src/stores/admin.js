import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ksAdmin: false,
};

const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateKsAdmin: (state, action) => {
      state.ksAdmin = action.payload;
    },
  },
});

export default admin.reducer;
export const { updateKsAdmin } = admin.actions;
