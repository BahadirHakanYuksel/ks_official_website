import { configureStore } from "@reduxjs/toolkit";
import admin from "./admin";
import lng from "./lng";
import app from "./app";
import theme from "./theme";

const stores = configureStore({
  reducer: { admin, lng, app, theme },
});

export default stores;
