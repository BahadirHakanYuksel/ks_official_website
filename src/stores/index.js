import { configureStore } from "@reduxjs/toolkit";
import admin from "./admin";
import lng from "./lng";
import app from "./app";
import theme from "./theme";
import modal from "./modal";

const stores = configureStore({
  reducer: { admin, lng, app, theme, modal },
});

export default stores;
