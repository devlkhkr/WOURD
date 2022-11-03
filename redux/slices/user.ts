import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  nickName: string;
  prfImg: string;
  lastLogin: Date;
}

export const userSlice = createSlice({
  name: "user",
  initialState: [] as UserData[],
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      return [...state, action.payload];
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
