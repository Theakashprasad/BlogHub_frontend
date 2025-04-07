import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Blog from "../../interface/Blog";

interface ModalState {
  showModal: boolean;
  activeBlog: Blog | null;
}

const initialState: ModalState = {
  showModal: false,
  activeBlog: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Blog | undefined>) => {
      state.activeBlog = action.payload || null;
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.activeBlog = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
