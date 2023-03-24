import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./helper/ScrollToTop";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
