import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import contextReducer, { ContextDataTypes } from "redux/slices/context";
import modalReducer, { ModalDataTypes } from "redux/slices/modal";
import alertReducer, { AlertDataTypes } from "./slices/alert";

import { store } from "redux/store";

export interface IState {
  context: ContextDataTypes;
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
        context: prevCliState.context,
        modal: prevCliState.modal,
        alert: prevCliState.alert,
      };
      return nextState;
    default: {
      const combinedReducer = combineReducers({
        context: contextReducer,
        modal: modalReducer,
        alert: alertReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
