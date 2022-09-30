import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/index.scss";

const app = document.getElementById("app");
const root = ReactDOM.createRoot(app);

root.render(<App />);
