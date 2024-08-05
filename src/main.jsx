import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import stores from "./stores/index.js";
import i18n from "./i18n.js";
import MyProvider from "./Context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MyProvider>
      <Provider store={stores}>
        <App />
      </Provider>
    </MyProvider>
  </BrowserRouter>
);
