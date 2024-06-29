import { configureStore } from "@reduxjs/toolkit";
import admin from "./admin";
import lng from "./lng";
import app from "./app";

const stores = configureStore({
  reducer: { admin, lng, app },
});

export default stores;
