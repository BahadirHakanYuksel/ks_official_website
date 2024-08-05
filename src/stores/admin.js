import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ksAdmin: {
    email: "bhy123",
    password: "123123",
    id: "1",
    localId: "2",
  },
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
