import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice";
import userinfoSlice from "../redux/userinfoSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userInfo: userinfoSlice
  }
});
export default store;
