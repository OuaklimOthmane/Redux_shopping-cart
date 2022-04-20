import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";

const store = configureStore({ reducer: { ui: uiReducer } });

export default store;
