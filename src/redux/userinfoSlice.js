import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  professional: null,
  personal: null
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      const { profile, professional, personal } = action.payload;
      state.profile = profile;
      state.professional = professional;
      state.personal = personal;
    },
    setData: (state, action) => {
      const { key, value } = action.payload;
      state.userData[key] = value;
    },
    getData: (state, action) => {
      const { key } = action.payload;
      return state.userData[key];
    },
    reset: (state) => {
      Object.assign(state, initialState);
    }
  }
});

export const { setUserData, setData, getData, reset } = userInfoSlice.actions;
export default userInfoSlice.reducer;
