import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import userReducer, { UserDataTypes } from "redux/slices/user";
import modalReducer, { ModalDataTypes } from "redux/slices/modal";

export interface IState {
  user: UserDataTypes;
  modal: ModalDataTypes;
}

const rootReducer = (
  state: IState,
  action: AnyAction
): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      console.log("payload:::::", action.payload);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
        modal: modalReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
