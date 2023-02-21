import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import contextReducer, { ContextDataTypes } from "redux/slices/context";
import modalReducer, { ModalDataTypes } from "redux/slices/modal";
import alertReducer, { AlertDataTypes } from "./slices/alert";
import confirmReducer, { ConfirmDataTypes } from "./slices/confirm";

import { store } from "redux/store";

export interface IState {
  context: ContextDataTypes;
  modal: ModalDataTypes;
  alert: AlertDataTypes;
  confirm: ConfirmDataTypes;
}

const rootReducer = (
  state: IState,
  action: AnyAction
): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      let prevCliState = store.getState();
      const nextState: IState = {
        context: prevCliState.context,
        modal: prevCliState.modal,
        alert: prevCliState.alert,
        confirm: prevCliState.confirm,
      };
      return nextState;
    default: {
      const combinedReducer = combineReducers({
        context: contextReducer,
        modal: modalReducer,
        alert: alertReducer,
        confirm: confirmReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
