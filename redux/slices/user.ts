import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  nickName: string;
  prfImg: string;
  lastLogin: Date;
}

export const user = createSlice({
  name: "user",
  initialState: [] as UserData[],
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      return [...state, action.payload];
    },
  },
});

export const { setUserData } = user.actions;
export default user.reducer;
