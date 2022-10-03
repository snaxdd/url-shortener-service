import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "./features/url.slice";

const store = configureStore({
  reducer: {
    url: urlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
