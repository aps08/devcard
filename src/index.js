import DataWrapper from "./utils/DataWrapper";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { Provider } from "react-redux";
import store from "./store/redux-store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <DataWrapper>
        <App />
      </DataWrapper>
    </BrowserRouter>
  </Provider>
);
