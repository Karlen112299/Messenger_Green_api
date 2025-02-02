import { combineReducers } from "@reduxjs/toolkit";
import { greenApi } from "./greenApi";

export const rootReducer = combineReducers({
   [greenApi.reducerPath]: greenApi.reducer ,
})