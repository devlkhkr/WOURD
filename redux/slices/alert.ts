import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createElement } from "react";

export interface AlertDataTypes {
  msg: string[];
  isEmpty: boolean;
}

const initialState: AlertDataTypes = {
  msg: [],
  isEmpty: true,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setMsg: (state, actions) => {
      state.msg.push(actions.payload.msg);
      state.isEmpty = state.msg.length === 0 ? true : false;
    },
    clearMsg: (state, actions) => {
      for (let i = 0; i < state.msg.length; i++) {
        if (state.msg[i] === actions.payload.msg) {
          state.msg.splice(i, 1);
          i--;
        }
      }
      state.isEmpty = state.msg.length === 0 ? true : false;
    },
  },
});

export const { setMsg, clearMsg } = alertSlice.actions;
export const selectAlert = (state: any) => state.alert;

export default alertSlice.reducer;
