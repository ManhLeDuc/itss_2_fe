import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import 'font-awesome/css/font-awesome.min.css';

Modal.setAppElement("#root");

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
