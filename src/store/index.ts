import { configureStore } from "@reduxjs/toolkit";
import { greenApi } from './api/greenApi'
import { rootReducer } from "./api/root-reducer";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(greenApi.middleware),
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store