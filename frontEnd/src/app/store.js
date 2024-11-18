import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userStatement";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
