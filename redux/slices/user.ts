import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  nickName: string;
  prfImg: string;
  lastLogin: Date;
}

export const user = createSlice({
  name: 'user',
  initialState: [

  ] as UserData[],
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      return [...state, action.payload];
    }
  }
});

// 액션과 리듀서를 export 해준다. 이건 그냥 따라하면 된다.
export const { setUserData } = user.actions;
export default user.reducer;