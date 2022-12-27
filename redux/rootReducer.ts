import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import userReducer, { UserDataTypes } from "redux/slices/user";
import modalReducer, { ModalDataTypes } from "redux/slices/modal";
import alertReducer, { AlertDataTypes } from "./slices/alert";

import { store } from "redux/store";

export interface IState {
  user: UserDataTypes;
  modal: ModalDataTypes;
  alert: AlertDataTypes;
}

const rootReducer = (
  state: IState,
  action: AnyAction
): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      let prevCliState = store.getState();
      console.log("prevCliState:::", prevCliState);
      const nextState: IState = {
        user: prevCliState.user,
        modal: prevCliState.modal,
        alert: prevCliState.alert,
      };
      return nextState;
    default: {
      const combinedReducer = combineReducers({
        user: userReducer,
        modal: modalReducer,
        alert: alertReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
