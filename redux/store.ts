import {
  AnyAction,
  configureStore,
  Reducer,
  Store,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import rootReducer, { IState } from "./rootReducer";
import logger from "redux-logger";
import { createWrapper } from "next-redux-wrapper";

const middleware = [...getDefaultMiddleware(), logger];

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    middleware,
  });
  return store;
};
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const wrapper = createWrapper<Store<IState>>(createStore);
export default wrapper;
