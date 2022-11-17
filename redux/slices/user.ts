import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDataTypes {
  id: string;
  nickName: string;
  prfImg: string;
  lastLogin: Date | string;
}

const initialState: UserDataTypes = {
  id: "",
  nickName: "",
  prfImg: "",
  lastLogin: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDataTypes>) => {
      // return [...state, action.payload];
      state.id = action.payload.id;
      state.nickName = action.payload.nickName;
      state.prfImg = action.payload.prfImg;
      state.lastLogin = action.payload.lastLogin;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
