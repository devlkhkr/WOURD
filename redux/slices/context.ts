import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContextListTypes {
  contextTit: string;
  color: string;
  onClick: string;
}

export interface ContextDataTypes {
  title: string;
  contextList: ContextListTypes[];
  isOpen: boolean;
  position: {
    x: number;
    y: number;
  };
}

const initialState: ContextDataTypes = {
  title: "",
  contextList: [],
  isOpen: false,
  position: { x: 0, y: 0 },
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setContext: (state, action: PayloadAction<ContextDataTypes>) => {
      state.title = action.payload.title;
      state.contextList = action.payload.contextList;
      state.isOpen = action.payload.isOpen;
      state.position = action.payload.position;
    },
    clearContext: (state, actions) => {
      state.isOpen = false;
    },
  },
});

export const { setContext, clearContext } = contextSlice.actions;
export default contextSlice.reducer;
