import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Request,
  RequestError,
  Response,
  ResponseError,
  sgAxios,
} from "./configs/axios";

// console.log = () => {};
// console.error = () => {};
// console.debug = () => {};

// sgAxios.defaults.baseURL = "http://localhost:5000/api/v1/";
sgAxios.defaults.baseURL = "https://swarrior-g4tor.ondigitalocean.app/api/v1/";
sgAxios.interceptors.request.use(Request, RequestError);
sgAxios.interceptors.response.use(Response, ResponseError);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  //   <React.StrictMode>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
