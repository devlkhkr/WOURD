import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalData {
  isOpened?: boolean;
}

export const modal = createSlice({
  name: 'modal',
  initialState: [

  ] as ModalData[],
  reducers: {
    setModalData(state, action: PayloadAction<ModalData>) {
      return [...state, action.payload];
    }
  }
});

// 액션과 리듀서를 export 해준다. 이건 그냥 따라하면 된다.
export const { setModalData } = modal.actions;
export default modal.reducer;