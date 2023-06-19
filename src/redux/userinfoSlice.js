import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userData: null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setData: (state, action) => {
      const { key, value } = action.payload;
      state.userData[key] = value;
    },
    getData: (state, action) => {
      const { key } = action.payload;
      return state.userData[key];
    }
  }
});

export const { setUserData, setData, getData } = userInfoSlice.actions;
export default userInfoSlice.reducer;
