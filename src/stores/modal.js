import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalInfos: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalBox: (state, action) => {
      state.modalInfos = action.payload;
    },
    closeModalBox: (state) => {
      state.modalInfos = false;
    },
  },
});

export default modal.reducer;
export const { openModalBox, closeModalBox } = modal.actions;
