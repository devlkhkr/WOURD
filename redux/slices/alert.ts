// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createElement } from "react";

// export interface RdxMsgTypes {
//   text: string;
//   id: string;
//   fold: boolean;
// }
// export interface AlertDataTypes {
//   msg: RdxMsgTypes[];
//   isEmpty: boolean;
// }

// const initialState: AlertDataTypes = {
//   msg: [],
//   isEmpty: true,
// };

// export const alertSlice = createSlice({
//   name: "alert",
//   initialState,
//   reducers: {
//     setMsg: (state, actions) => {
//       state.msg.push(actions.payload.msg);
//       state.isEmpty = state.msg.length === 0 ? true : false;
//     },
//     foldMsg: (state, actions) => {
      
//     },
//     clearMsg: (state, actions) => {
//       for (let i = 0; i < state.msg.length; i++) {
//         if (state.msg[i].id === actions.payload.msg.id) {
//           state.msg.splice(i, 1);
//           i--;
//         }
//       }
//       state.isEmpty = state.msg.length === 0 ? true : false;
//     },
//   },
// });

// export const { setMsg, foldMsg, clearMsg } = alertSlice.actions;
// export const selectAlert = (state: any) => state.alert;

// export default alertSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RdxMsgTypes {
  [prop:string]: any;
  text?: string;
  id?: string;
}
export interface AlertDataTypes {
  msg: RdxMsgTypes;
  isEmpty: boolean;
}

const initialState: AlertDataTypes = {
  msg: {},
  isEmpty: true,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setMsg: (state, actions) => {
      state.msg[actions.payload.msg.id] = actions.payload.msg.text;
      state.isEmpty = Object.keys(state.msg).length === 0 ? true : false;
    },
    clearMsg: (state, actions) => {
      delete state.msg[actions.payload.msg.id]
      state.isEmpty = Object.keys(state.msg).length === 0 ? true : false;
    },
  },
});

export const { setMsg, clearMsg } = alertSlice.actions;
export const selectAlert = (state: any) => state.alert;

export default alertSlice.reducer;
