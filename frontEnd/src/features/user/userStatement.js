import { createSlice } from "@reduxjs/toolkit";

export const userStatement = createSlice({
  name: "user",
  initialState: {
    value:
      (localStorage.getItem("Token") || sessionStorage.getItem("Token")) ??
      false,
    informations: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
    },
  },
  reducers: {
    loggedIn: (state) => {
      state.value = true;
    },
    setUserInformations: (state, action) => {
      state.informations = action.payload;
    },
    loggedOut: (state) => {
      localStorage.clear();
      sessionStorage.clear();
      state.value = false;
    },
  },
});

export const { loggedIn, loggedOut, setUserInformations } =
  userStatement.actions;

export default userStatement.reducer;
