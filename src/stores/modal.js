import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalInfos: false,
  teamModal: false,
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
    openTeamModal: (state, action) => {
      state.teamModal = action.payload;
    },
    closeTeamModal: (state) => {
      state.teamModal = false;
    },
  },
});

export default modal.reducer;
export const { openModalBox, closeModalBox, openTeamModal, closeTeamModal } =
  modal.actions;
