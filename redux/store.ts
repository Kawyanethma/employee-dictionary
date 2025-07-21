// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "@/redux/slices/snackBar";
import authReducer from "@/redux/slices/auth";
import { randomQuoteApi } from "@/services/quote.api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  snackBar: snackBarReducer,
  auth: authReducer,
  [randomQuoteApi.reducerPath]: randomQuoteApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(randomQuoteApi.middleware),
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
