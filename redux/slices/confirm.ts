import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConfirmDataTypes {
  confirmText: string;
  confirmSubmit: Function;
  isOpen: boolean;
  submitTit?: string,
}

const initialState: ConfirmDataTypes = {
  confirmText: "",
  submitTit: "",
  isOpen: false,
  confirmSubmit: () => {}
};

export const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    setConfirm: (state, actions) => {
      const { confirmText, submitTit, confirmSubmit } = actions.payload;
      state.confirmText = confirmText;
      state.submitTit = submitTit;
      state.confirmSubmit = confirmSubmit;
      state.isOpen = true;
    },
    closeConfirm: (state) => {
      state.confirmText = "";
      state.submitTit = "";
      state.confirmSubmit = () => {};
      state.isOpen = false;
    },
  },
});

export const { setConfirm, closeConfirm } = confirmSlice.actions;
export const selectConfirm = (state: any) => state.confirm;

export default confirmSlice.reducer;
