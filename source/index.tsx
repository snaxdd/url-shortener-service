import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./store";

const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
